import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../../common/store/core.action";
import { GameFilter } from "../../game/models/game-filter.interface";
import { GameService } from "../services/game.service";

@Component({
    selector: "game-sync",
    templateUrl: "./game-sync.component.html",
    styleUrl: "./game-sync.component.scss",
    providers: [GameService]
})
export class SyncComponent implements OnInit {
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly store = inject(Store);

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshotAction(undefined));
        this.store.dispatch(
            new UpdateGamesListingFilterAction(<GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 10, status: StatusEnum.PlayingCompleted })
        );

        this.sync();
    }

    private sync() {
        this.service
            .syncItad()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.router.navigate(["/"]);
            });
    }
}
