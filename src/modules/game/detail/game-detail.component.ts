import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { IconEnum } from "../../../common/enums/icon.enum";
import { UserInfo } from "../../../common/helpers/user-info";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../../common/store/core.action";
import { ButtonComponent } from "../../../components/button/button.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { StatusComponent } from "../../../components/status/status.component";
import { GameEditComponent } from "../edit/game-edit.component";
import { GameMapper } from "../mappers/game.mapper";
import { Game } from "../models/game.interface";
import { GameService } from "../services/game.service";

@Component({
    selector: "game-detail",
    imports: [ButtonComponent, StarRatingComponent, DatePipe, StatusComponent, DecimalPipe, IconComponent, NgxSkeletonLoaderModule],
    templateUrl: "./game-detail.component.html",
    styleUrl: "./game-detail.component.scss",
    providers: [GameService]
})
export class GameDetailComponent {
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly store = inject(Store);
    private readonly gameMapper = inject(GameMapper);
    private readonly modalService = inject(NgbModal);

    protected game = <Game>{ timePlayed: {} };
    protected gameId: string | null = null;
    protected iconEnum = IconEnum;
    protected isLoading = false;
    protected fromManualRegister = false;
    protected readMoreActive = false;
    protected isUserLoggedIn = UserInfo.isLoggedIn();

    public ngOnInit(): void {
        this.gameId = this.activatedRoute.snapshot.paramMap.get("id");
        this.fromManualRegister = { ...history.state }.fromManualRegister;

        if (!this.gameId) {
            this.store.dispatch(new UpdateGamesListingFilterAction({ page: 1, sort: 2, status: 5 }));
            this.openModal();
            return;
        }

        this.findGameById();
    }

    private findGameById() {
        if (!this.gameId) {
            return;
        }

        this.isLoading = true;

        this.service
            .getById(this.gameId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.game = this.gameMapper.findById(result);
                this.store.dispatch(new UpdateBackgroundScreenshotAction(this.game.screenshot));
                this.isLoading = false;

                if (this.fromManualRegister) {
                    this.openModal();
                }
            });
    }

    public openModal() {
        const modalRef = this.modalService.open(GameEditComponent, { centered: true, size: "xl" });
        modalRef.componentInstance.game = this.game.id ? structuredClone(this.game) : { timePlayed: {}, achievements: [] };
        modalRef.componentInstance.manualRegister = !this.game.id;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game = structuredClone(result);
            this.store.dispatch(new UpdateBackgroundScreenshotAction(this.game.screenshot));
        });
    }

    public toggleReadMore() {
        this.readMoreActive = !this.readMoreActive;
    }
}
