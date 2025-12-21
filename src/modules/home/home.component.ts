import { AsyncPipe, Location } from "@angular/common";
import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgbPagination, NgbPaginationFirst, NgbPaginationLast } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { Subscription, take } from "rxjs";
import { IconEnum } from "../../common/enums/icon.enum";
import { PlatformEnum } from "../../common/enums/platform.enum";
import { SortDirection } from "../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../common/enums/status.enum";
import { GameListSort } from "../../common/sorts/game-list.sort";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { LoaderState } from "../../common/store/loader.state";
import { ButtonComponent } from "../../components/button/button.component";
import { IconComponent } from "../../components/icon/icon.component";
import { InputComponent } from "../../components/input/input.component";
import { StarRatingComponent } from "../../components/rating/rating.component";
import { RowComponent } from "../../components/row/row.component";
import { SelectComponent } from "../../components/select/select.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { GameDetailGameImageSkeletonComponent } from "../game/detail/game-image-skeleton/game-image-skeleton.component";
import { GameDetailGameImageComponent } from "../game/detail/game-image/game-image.component";
import { GameMapper } from "../game/mappers/game.mapper";
import { GameCountByStatus } from "../game/models/game-count-by-status.interface";
import { PlatformsData, TrueFalseData } from "../game/models/game-edit.data";
import { GameFilter } from "../game/models/game-filter.interface";
import { Game } from "../game/models/game.interface";
import { Genre } from "../game/models/genre.interface";
import { Theme } from "../game/models/theme.interface";
import { GameService } from "../game/services/game.service";
import { GameListSortBy, GameListStatus } from "./home.data";

@Component({
    selector: "app-home",
    imports: [
        GameDetailGameImageComponent,
        GameDetailGameImageSkeletonComponent,
        NgbPagination,
        NgbPaginationFirst,
        NgbPaginationLast,
        IconComponent,
        AsyncPipe,
        SidebarComponent,
        RowComponent,
        InputComponent,
        SelectComponent,
        StarRatingComponent,
        ButtonComponent
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    providers: [GameService]
})
export class HomeComponent implements OnInit {
    private readonly service = inject(GameService);
    private readonly destroyref = inject(DestroyRef);
    private readonly store = inject(Store);
    private readonly titleService = inject(Title);
    private readonly mapper = inject(GameMapper);
    private readonly location = inject(Location);
    private readonly activatedRoute = inject(ActivatedRoute);

    protected games = <Game[]>[];
    protected genres = <Genre[]>[];
    protected themes = <Theme[]>[];
    protected gamesCount = <GameCountByStatus>{};
    protected isLoading = false;
    protected gameListSortBy = GameListSortBy;
    protected statusEnum = StatusEnum;
    protected requisition?: Subscription;
    protected isLoading$ = inject(Store).select(LoaderState.isLoading);
    protected skeletonArray = [];
    protected icons = IconEnum;
    protected isSidebarOpened = signal(false);
    protected filter = <GameFilter>{};
    protected oldFilter = <GameFilter>{};
    protected platforms = PlatformsData;
    protected trueFalse = TrueFalseData;
    protected platformEnum = PlatformEnum;
    protected gameListStatus = GameListStatus;

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshotAction(undefined));
        this.listenForFilterChanges();
        this.titleService.setTitle("Trophies");
    }

    private listenForFilterChanges() {
        this.store
            .select(CoreState.filter)
            .pipe(take(1))
            .subscribe((filters) => {
                this.filter = filters;
                this.extractQueryParams();

                this.listGames();
            });
    }

    private extractQueryParams() {
        const params: any = this.activatedRoute.snapshot.queryParams;
        if (params.genre) {
            this.filter.genre = params.genre;
        }

        if (params.theme) {
            this.filter.theme = params.theme;
        }

        const path = this.location.path().split("?")[0];
        this.location.replaceState(path);
    }

    public listGames() {
        this.isLoading = true;
        this.games = [];
        this.skeletonArray = [].constructor(18);

        if (this.requisition) {
            this.requisition.unsubscribe();
        }

        this.isSidebarOpened.set(false);

        this.requisition = this.service.listGames(this.filter).subscribe({
            next: (result: any) => {
                this.skeletonArray = [];
                this.games = result.games.map(this.mapper.findById);

                this.filter = { ...this.filter, ...result.pagination };
                this.oldFilter = <GameFilter>{};
                this.store.dispatch(new UpdateGamesListingFilterAction(this.filter));

                this.isLoading = false;
                this.getGamesCountByStatus();
            },
            error: (err) => {
                console.error("Erro:", err);
            }
        });
    }

    public revertFilters() {
        this.filter = { ...this.oldFilter };

        this.oldFilter = <GameFilter>{};
    }

    private getGamesCountByStatus() {
        this.service
            .getGamesCountByStatus(this.filter)
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result: any) => {
                this.gamesCount = result;
            });
    }

    public openSidebar() {
        this.oldFilter = { ...this.filter };
        this.listGenres();
        this.listThemes();
        this.isSidebarOpened.set(true);
    }

    private listGenres() {
        if (this.genres.length) {
            return;
        }

        this.service
            .listGenres()
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result) => {
                this.genres = result.sortByField([{ fieldName: "name" }]);
            });
    }

    private listThemes() {
        if (this.themes.length) {
            return;
        }

        this.service
            .listThemes()
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result) => {
                this.themes = result.sortByField([{ fieldName: "name" }]);
            });
    }

    public saveFilter() {
        this.store.dispatch(new UpdateGamesListingFilterAction(this.filter));
    }

    public clearFilter() {
        this.filter = <GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 18, status: StatusEnum.PlayingCompleted };
        this.listGames();
    }

    public setPageOnState(page: number) {
        this.filter.page = page;
        this.listGames();
    }

    public setStatus(status: number) {
        this.filter.status = status;
        this.filter.page = 1;

        if (status === StatusEnum.Backlog) {
            this.filter.sort = GameListSort.Name;
        } else if (status === StatusEnum.Wishlist) {
            this.filter.sort = GameListSort.Price;
        } else {
            this.filter.sort = GameListSort.LastPlayed;
        }

        this.listGames();
    }
}
