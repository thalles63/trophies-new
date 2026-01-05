import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { IconEnum } from "../../../common/enums/icon.enum";
import { LoaderEnum } from "../../../common/enums/loader.enum";
import { PlatformEnum } from "../../../common/enums/platform.enum";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { UserInfo } from "../../../common/helpers/user-info";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../../common/store/core.action";
import { CoreState } from "../../../common/store/core.state";
import { ButtonComponent } from "../../../components/button/button.component";
import { LabelComponent } from "../../../components/label/label.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { LoaderService } from "../../../components/loader/loader.service";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { RowComponent } from "../../../components/row/row.component";
import { StatusComponent } from "../../../components/status/status.component";
import { GameEditComponent } from "../edit/game-edit.component";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";
import { GameFilter } from "../models/game-filter.interface";
import { Game } from "../models/game.interface";
import { GameService } from "../services/game.service";
import { GameDetailAchievementComponent } from "./achievement/achievement.component";
import { GameDetailGameImageComponent } from "./game-image/game-image.component";
import { GameDetailGameScreenshotsComponent } from "./game-screenshots/game-screenshots.component";
import { GameHowLongToBeatComponent } from "./how-long-to-beat/how-long-to-beat.component";

@Component({
    selector: "game-detail",
    imports: [
        ButtonComponent,
        StarRatingComponent,
        DatePipe,
        StatusComponent,
        LabelComponent,
        RowComponent,
        RouterLink,
        DecimalPipe,
        GameDetailAchievementComponent,
        GameDetailGameImageComponent,
        GameDetailGameScreenshotsComponent,
        GameHowLongToBeatComponent,
        LoaderComponent
    ],
    templateUrl: "./game-detail.component.html",
    styleUrl: "./game-detail.component.scss",
    providers: [GameService]
})
export class GameDetailComponent implements OnInit {
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly store = inject(Store);
    private readonly gameMapper = inject(GameMapper);
    private readonly modalService = inject(NgbModal);
    private readonly titleService = inject(Title);
    private readonly loaderService = inject(LoaderService);

    protected game = <Game>{
        achievements: <Achievement[]>[],
        timePlayed: {},
        genresDescription: <any>[],
        themesDescription: <any>[],
        screenshots: <string[]>[]
    };
    protected gameId: string | null = null;
    protected iconEnum = IconEnum;
    protected platformEnum = PlatformEnum;
    protected readMoreActive = false;
    protected isUserLoggedIn = UserInfo.isLoggedIn();
    protected isLoggedInUser$ = this.store.select(CoreState.isLoggedInUser);
    protected statusEnum = StatusEnum;
    protected loaderEnum = LoaderEnum;

    public ngOnInit(): void {
        this.gameId = this.activatedRoute.snapshot.paramMap.get("id");

        if (!this.gameId) {
            this.store.dispatch(
                new UpdateGamesListingFilterAction(<GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 18, status: StatusEnum.PlayingCompleted })
            );
            this.openModal();
            return;
        }

        this.findGameById();
        this.listenForUserLogin();
    }

    private listenForUserLogin() {
        this.isLoggedInUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoggedInUser) => {
            this.isUserLoggedIn = !!isLoggedInUser;
        });
    }

    private findGameById() {
        if (!this.gameId) {
            return;
        }

        this.service
            .getById(this.gameId)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.GAME_DETAIL))
            .subscribe((result) => {
                this.game = this.gameMapper.findById(result);
                const banner = this.game.screenshots?.length
                    ? this.game.screenshots[Math.floor(Math.random() * this.game.screenshots.length)].replace("t_screenshot_med", "t_1080p_2x")
                    : this.game.banner;
                this.store.dispatch(new UpdateBackgroundScreenshotAction(banner));
                this.titleService.setTitle("Trophies - " + this.game.name);
            });
    }

    public openGamePurchasePage(event: Event) {
        event.stopPropagation();

        window.open(this.game.urlToBuy, "_blank");
    }

    public openModal() {
        const modalRef = this.modalService.open(GameEditComponent, { centered: true, size: "xl" });
        modalRef.componentInstance.game = this.game.id ? structuredClone(this.game) : { timePlayed: {}, achievements: [] };
        modalRef.componentInstance.manualRegister = !this.game.id;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.findGameById();
        });
    }

    public toggleReadMore() {
        this.readMoreActive = !this.readMoreActive;
    }
}
