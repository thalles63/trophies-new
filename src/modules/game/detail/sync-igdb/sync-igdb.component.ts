import { Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CameraIconComponent } from "../../../../components/icons/camera/camera-icon.component";
import { SearchIconComponent } from "../../../../components/icons/search/search-icon.component";
import { InputComponent } from "../../../../components/input/input.component";
import { Game } from "../../models/game.interface";
import { GameService } from "../../services/game.service";

@Component({
    selector: "sync-igdb",
    imports: [InputComponent, ButtonComponent, SearchIconComponent, NgxSkeletonLoaderModule, CameraIconComponent],
    templateUrl: "./sync-igdb.component.html",
    styleUrl: "./sync-igdb.component.scss",
    providers: [GameService]
})
export class SyncGameWithIgdbComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);

    @Input() public game = <Game>{};
    @Input() public gameName = "";
    protected selectedGame = <Game>{};
    protected retrievedGames = <Game[]>[];
    protected isLoading = false;

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
                    this.notificationService.error("Jogo não encontrado");
                    this.isLoading = false;
                }
            });
    }

    public selectGame(game: Game): void {
        this.selectedGame = game;
    }

    public sync() {
        this.selectedGame.id = this.game.id;

        this.service
            .update(this.selectedGame)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                Object.assign(this.game, this.selectedGame);
                this.activeModal.close(this.game);
            });
    }

    public cancel() {
        this.activeModal.close();
    }
}
