import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { Game } from "../../models/game.interface";
import { AchievementsService } from "../../services/achievement.service";
import { GameService } from "../../services/game.service";

@Component({
    selector: "sync-steam",
    imports: [ButtonComponent, NgxSkeletonLoaderModule, IconComponent],
    templateUrl: "./search-steam.component.html",
    styleUrl: "./search-steam.component.scss",
    providers: [GameService, AchievementsService]
})
export class SearchGameInSteamComponent implements AfterContentInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly service = inject(GameService);
    private readonly achievementsService = inject(AchievementsService);
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
        this.searchSteam();
    }

    public searchSteam() {
        this.isLoading = true;

        this.service
            .searchSteam(this.gameName)
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

    public selectGameAndSave() {
        this.isSaveLoading = true;

        this.achievementsService
            .saveFromSteam(this.selectedGame.platformId!, this.gameId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.isLoading = false;
                    this.activeModal.close(result);
                },
                error: () => {
                    this.isLoading = false;
                }
            });
    }

    public selectGame(game: Game): void {
        this.selectedGame = game;
    }

    public cancel() {
        this.activeModal.close();
    }
}
