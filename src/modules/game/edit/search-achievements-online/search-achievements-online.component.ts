import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GameSearchOriginEnum } from "../../../../common/enums/game-search-origin.enum";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { GameFromOnline } from "../../models/game-from-online.interface";
import { AchievementsService } from "../../services/achievement.service";
import { GameService } from "../../services/game.service";

@Component({
    selector: "search-achievements-online",
    imports: [ButtonComponent, IconComponent],
    templateUrl: "./search-achievements-online.component.html",
    styleUrl: "./search-achievements-online.component.scss",
    providers: [GameService, AchievementsService]
})
export class SearchAchievementsOnlineComponent implements AfterContentInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly service = inject(GameService);
    private readonly achievementsService = inject(AchievementsService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);

    @Input({ required: true }) public gameId = "";
    @Input({ required: true }) public gameName = "";
    @Input({ required: true }) public origin!: GameSearchOriginEnum;
    protected selectedGame = <GameFromOnline>{};
    protected retrievedGames = <GameFromOnline[]>[];
    protected isLoading = false;
    protected isSaveLoading = false;
    protected iconEnum = IconEnum;
    protected readonly gameSearchOriginEnum = GameSearchOriginEnum;

    public ngAfterContentInit(): void {
        this.searchGame();
    }

    public searchGame() {
        this.isLoading = true;

        const service = this.origin === GameSearchOriginEnum.Steam ? this.service.searchSteam(this.gameName) : this.service.searchPsnProfiles(this.gameName);

        service.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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

    public saveGame() {
        this.isSaveLoading = true;

        const service =
            this.origin === GameSearchOriginEnum.Steam
                ? this.achievementsService.saveFromSteam(this.selectedGame.platformId, this.gameId)
                : this.achievementsService.saveFromPsn(this.selectedGame.url, this.gameId);

        service.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (result) => {
                this.isLoading = false;
                this.activeModal.close(result);
            },
            error: () => {
                this.isLoading = false;
            }
        });
    }

    public selectGame(game: GameFromOnline): void {
        this.selectedGame = game;
    }

    public cancel() {
        this.activeModal.close();
    }
}
