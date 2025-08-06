import { AsyncPipe } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { NgbPagination, NgbPaginationFirst, NgbPaginationLast } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { Subscription } from "rxjs";
import { StatusEnum } from "../../common/enums/status.enum";
import { PaginationInfo } from "../../common/models/pagination.interface";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { LoaderState } from "../../common/store/loader.state";
import { GameDetailGameImageSkeletonComponent } from "../game/detail/game-image-skeleton/game-image-skeleton.component";
import { GameDetailGameImageComponent } from "../game/detail/game-image/game-image.component";
import { GameMapper } from "../game/mappers/game.mapper";
import { GameCountByStatus } from "../game/models/game-count-by-status.interface";
import { Game } from "../game/models/game.interface";
import { GameListSortBy } from "./home.data";
import { HomeService } from "./services/home.service";
import { SortByComponent } from "./sort-by/sort-by.component";

@Component({
    selector: "app-home",
    imports: [
        GameDetailGameImageComponent,
        GameDetailGameImageSkeletonComponent,
        NgbPagination,
        NgbPaginationFirst,
        NgbPaginationLast,
        SortByComponent,
        AsyncPipe
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    private readonly service = inject(HomeService);
    private readonly destroyref = inject(DestroyRef);
    private readonly store = inject(Store);
    private readonly titleService = inject(Title);
    private readonly mapper = inject(GameMapper);

    protected games = <Game[]>[];
    protected gamesCount = <GameCountByStatus>{};
    protected paginationInfo = <PaginationInfo>{};
    protected isLoading = false;
    protected gameListSortBy = GameListSortBy;
    protected statusEnum = StatusEnum;
    protected requisition?: Subscription;
    protected isLoading$ = inject(Store).select(LoaderState.isLoading);
    protected skeletonArray = [];

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshotAction(undefined));
        this.listenForFilterChanges();
        this.titleService.setTitle("Trophies");
        this.getGamesCountByStatus();
    }

    private listenForFilterChanges() {
        this.store
            .select(CoreState.filter)
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((filters) => {
                this.paginationInfo.page = filters.page!;
                this.paginationInfo.sort = filters.sort!;
                this.paginationInfo.limit = filters.limit!;
                this.paginationInfo.status = filters.status!;

                this.listGames();
            });
    }

    public listGames() {
        this.isLoading = true;
        this.games = [];
        this.skeletonArray = [].constructor(18);

        if (this.requisition) {
            this.requisition.unsubscribe();
        }

        this.requisition = this.service
            .listGames(this.paginationInfo.page, this.paginationInfo.limit, this.paginationInfo.sort, this.paginationInfo.status)
            .subscribe({
                next: (result: any) => {
                    this.skeletonArray = [];
                    this.games = result.games.map(this.mapper.findById);
                    this.paginationInfo = { ...this.paginationInfo, ...result.pagination };
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error("Erro:", err);
                }
            });
    }

    private getGamesCountByStatus() {
        this.service
            .getGamesCountByStatus()
            .pipe(takeUntilDestroyed(this.destroyref))
            .subscribe((result: any) => {
                this.gamesCount = result;
            });
    }

    public setPageOnState(page: number) {
        this.store.dispatch(new UpdateGamesListingFilterAction({ page }));
    }

    public setSortOnState(sort: number) {
        this.store.dispatch(new UpdateGamesListingFilterAction({ sort, page: 1 }));
    }

    public setStatus(status: number) {
        this.paginationInfo.status = status;
        this.store.dispatch(new UpdateGamesListingFilterAction({ page: 1, status: this.paginationInfo.status }));
        this.listGames();
    }
}
