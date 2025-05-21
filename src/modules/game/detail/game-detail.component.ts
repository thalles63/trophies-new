import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { UpdateBackgroundScreenshot } from "../../../common/store/core.action";
import { ButtonComponent } from "../../../components/button/button.component";
import { TrophyIconComponent } from "../../../components/icons/trophy/trophy-icon.component";
import { WarningIconComponent } from "../../../components/icons/warning/warning-icon.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { StatusComponent } from "../../../components/status/status.component";
import { GameEditComponent } from "../edit/game-edit.component";
import { GameMapper } from "../mappers/game.mapper";
import { Game } from "../models/game.interface";
import { GameService } from "../services/game.service";
import { SyncGameWithIgdbComponent } from "./sync-igdb/sync-igdb.component";

@Component({
    selector: "game-detail",
    imports: [WarningIconComponent, ButtonComponent, StarRatingComponent, DatePipe, TrophyIconComponent, StatusComponent, DecimalPipe],
    templateUrl: "./game-detail.component.html",
    styleUrl: "./game-detail.component.scss",
    providers: [GameService]
})
export class GameDetailComponent {
    private readonly service = inject(GameService);
    private readonly destroyref = inject(DestroyRef);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly store = inject(Store);
    private readonly gameMapper = inject(GameMapper);
    private readonly modalService = inject(NgbModal);

    protected game = <Game>{ timePlayed: {} };
    protected gameId: string | null = null;

    public ngOnInit(): void {
        this.gameId = this.activatedRoute.snapshot.paramMap.get("id");
        this.findGameById();
    }

    private findGameById() {
        if (!this.gameId) {
            return;
        }

        this.service
            .getById(this.gameId)
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result) => {
                this.game = this.gameMapper.findById(result);
                this.store.dispatch(new UpdateBackgroundScreenshot(this.game.screenshot));
            });
    }

    public edit() {
        const modalRef = this.modalService.open(GameEditComponent, { centered: true, size: "xl" });
        modalRef.componentInstance.game = structuredClone(this.game);

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyref)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game = structuredClone(result);
            this.store.dispatch(new UpdateBackgroundScreenshot(this.game.screenshot));
        });
    }

    public syncWithIgdb() {
        const modalRef = this.modalService.open(SyncGameWithIgdbComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.game = this.game;
        modalRef.componentInstance.gameName = this.game.name;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyref)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game = structuredClone(result);
            this.store.dispatch(new UpdateBackgroundScreenshot(this.game.screenshot));
        });
    }
}
