import { DatePipe } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { IconEnum } from "../../../common/enums/icon.enum";
import { PlatformEnum } from "../../../common/enums/platform.enum";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { UserInfo } from "../../../common/helpers/user-info";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../../common/store/core.action";
import { CoreState } from "../../../common/store/core.state";
import { LoaderState } from "../../../common/store/loader.state";
import { ButtonComponent } from "../../../components/button/button.component";
import { LabelComponent } from "../../../components/label/label.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { RowComponent } from "../../../components/row/row.component";
import { StatusComponent } from "../../../components/status/status.component";
import { GameEditComponent } from "../edit/game-edit.component";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";
import { GameFilter } from "../models/game-filter.interface";
import { Game } from "../models/game.interface";
import { GameService } from "../services/game.service";
import { GameDetailAchievementSkeletonComponent } from "./achievement-skeleton/achievement-skeleton.component";
import { GameDetailAchievementComponent } from "./achievement/achievement.component";
import { GameDetailGameImageSkeletonComponent } from "./game-image-skeleton/game-image-skeleton.component";
import { GameDetailGameImageComponent } from "./game-image/game-image.component";

@Component({
    selector: "game-detail",
    imports: [
        ButtonComponent,
        StarRatingComponent,
        DatePipe,
        StatusComponent,
        LabelComponent,
        RowComponent,
        GameDetailAchievementComponent,
        GameDetailAchievementSkeletonComponent,
        GameDetailGameImageComponent,
        GameDetailGameImageSkeletonComponent
    ],
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
    private readonly titleService = inject(Title);

    protected game = <Game>{ achievements: <Achievement[]>[], timePlayed: {}, genresDescription: <any>[], themesDescription: <any>[] };
    protected gameId: string | null = null;
    protected iconEnum = IconEnum;
    protected platformEnum = PlatformEnum;
    protected fromManualRegister = false;
    protected readMoreActive = false;
    protected isUserLoggedIn = UserInfo.isLoggedIn();
    protected isLoggedInUser$ = this.store.select(CoreState.isLoggedInUser);
    protected isLoading = false;
    protected isLoading$ = this.store.select(LoaderState.isLoading);
    protected isModalOpened = false;

    public ngOnInit(): void {
        this.gameId = this.activatedRoute.snapshot.paramMap.get("id");
        this.fromManualRegister = { ...history.state }.fromManualRegister;

        if (!this.gameId) {
            this.store.dispatch(
                new UpdateGamesListingFilterAction(<GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 18, status: StatusEnum.PlayingCompleted })
            );
            this.openModal();
            return;
        }

        this.findGameById();
        this.listenForUserLogin();
        this.listenForLoading();
    }

    private listenForUserLogin() {
        this.isLoggedInUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoggedInUser) => {
            this.isUserLoggedIn = !!isLoggedInUser;
        });
    }

    private listenForLoading() {
        this.isLoading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoading) => {
            this.isLoading = !!isLoading && !this.isModalOpened;
        });
    }

    private findGameById() {
        if (!this.gameId) {
            return;
        }

        this.service
            .getById(this.gameId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.game = this.gameMapper.findById(result);
                this.store.dispatch(new UpdateBackgroundScreenshotAction(this.game.screenshot));
                this.titleService.setTitle("Trophies - " + this.game.name);

                if (this.fromManualRegister) {
                    this.openModal();
                }
            });
    }

    public openModal() {
        this.isModalOpened = true;
        const modalRef = this.modalService.open(GameEditComponent, { centered: true, size: "xl" });
        modalRef.componentInstance.game = this.game.id ? structuredClone(this.game) : { timePlayed: {}, achievements: [] };
        modalRef.componentInstance.manualRegister = !this.game.id;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.isModalOpened = false;
            this.game = structuredClone(result);
            this.store.dispatch(new UpdateBackgroundScreenshotAction(this.game.screenshot));
        });
    }

    public toggleReadMore() {
        this.readMoreActive = !this.readMoreActive;
    }
}
