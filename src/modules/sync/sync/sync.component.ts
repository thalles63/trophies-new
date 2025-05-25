import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { PlatformEnum } from "../../../common/enums/platform.enum";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../../common/store/core.action";
import { PlatformsData } from "../../game/edit/game-edit.data";
import { SyncService } from "./sync.service";

@Component({
    selector: "sync",
    templateUrl: "./sync.component.html",
    styleUrl: "./sync.component.scss",
    providers: [SyncService]
})
export class SyncComponent implements OnInit {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly service = inject(SyncService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly store = inject(Store);

    protected platformToSync = "";
    protected platformText = "";

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshotAction(undefined));
        this.store.dispatch(new UpdateGamesListingFilterAction({ page: 1, sort: 2, status: 5 }));

        this.platformToSync = this.activatedRoute.snapshot.data["platform"];
        this.platformText = PlatformsData.find((p) => p.id === Number(this.platformToSync))?.description!;

        this.sync();
    }

    private sync() {
        if (Number(this.platformToSync) === PlatformEnum.Playstation5) {
            this.syncWithPlaystation();
            return;
        }

        if (Number(this.platformToSync) === PlatformEnum.Xbox) {
            this.syncWithXbox();
            return;
        }

        if (Number(this.platformToSync) === PlatformEnum.Steam) {
            this.syncWithSteam();
        }
    }

    private syncWithPlaystation() {
        this.service
            .syncWithPlaystation()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.router.navigate(["/"]);
            });
    }

    private syncWithXbox() {
        this.service
            .syncWithXbox()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.router.navigate(["/"]);
            });
    }

    private syncWithSteam() {
        this.service
            .syncWithSteam()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.router.navigate(["/"]);
            });
    }
}
