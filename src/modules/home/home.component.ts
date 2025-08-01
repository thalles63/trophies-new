import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { NgbPagination, NgbPaginationFirst, NgbPaginationLast } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { Subscription } from "rxjs";
import { StatusEnum } from "../../common/enums/status.enum";
import { PaginationInfo } from "../../common/models/pagination.interface";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { GameCountByStatus } from "../game/models/game-count-by-status.interface";
import { Game } from "../game/models/game.interface";
import { GameCardComponent } from "./game-card/game-card.component";
import { GameListSortBy } from "./home.data";
import { HomeService } from "./services/home.service";
import { SortByComponent } from "./sort-by/sort-by.component";

@Component({
    selector: "app-home",
    imports: [GameCardComponent, NgbPagination, NgbPaginationFirst, NgbPaginationLast, NgxSkeletonLoaderModule, SortByComponent],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    providers: [HomeService]
})
export class HomeComponent implements OnInit {
    private readonly service = inject(HomeService);
    private readonly destroyref = inject(DestroyRef);
    private readonly store = inject(Store);
    private readonly titleService = inject(Title);

    protected games = <Game[]>[];
    protected gamesCount = <GameCountByStatus>{};
    protected paginationInfo = <PaginationInfo>{};
    protected isLoading = false;
    protected gameListSortBy = GameListSortBy;
    protected statusEnum = StatusEnum;
    protected requisition?: Subscription;

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

        if (this.requisition) {
            this.requisition.unsubscribe();
        }

        this.requisition = this.service
            .listGames(this.paginationInfo.page, this.paginationInfo.limit, this.paginationInfo.sort, this.paginationInfo.status)
            .subscribe({
                next: (result: any) => {
                    this.games = result.games;
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
