import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { Game } from "../../models/game.interface";
import { GameService } from "../../services/game.service";

@Component({
    selector: "sync-igdb",
    imports: [ButtonComponent, NgxSkeletonLoaderModule, IconComponent],
    templateUrl: "./search-igdb.component.html",
    styleUrl: "./search-igdb.component.scss",
    providers: [GameService]
})
export class SearchGameInIgdbComponent implements AfterContentInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);

    @Input() public gameId = "";
    @Input() public gameName = "";
    protected selectedGame = <Game>{};
    protected retrievedGames = <Game[]>[];
    protected isLoading = false;
    protected isSaveLoading = false;
    protected iconEnum = IconEnum;

    public ngAfterContentInit(): void {
        this.searchIgdb();
    }

    public searchIgdb() {
        this.isLoading = true;

        this.service
            .searchIgdb(this.gameName)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.retrievedGames = result;
                    this.isLoading = false;
                },
                error: () => {
                    this.notificationService.error("Game not found");
                    this.isLoading = false;
                }
            });
    }

    public selectGame(game: Game): void {
        this.selectedGame = game;
    }

    public confirm() {
        this.activeModal.close(this.selectedGame);
    }

    public cancel() {
        this.activeModal.close();
    }
}
