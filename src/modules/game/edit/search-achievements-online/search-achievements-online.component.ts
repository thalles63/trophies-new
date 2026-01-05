import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { AchievementSearchOriginEnum } from "../../../../common/enums/achievement-search-origin.enum";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { LoaderEnum } from "../../../../common/enums/loader.enum";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { LoaderService } from "../../../../components/loader/loader.service";
import { GameFromOnline } from "../../models/game-from-online.interface";
import { AchievementsService } from "../../services/achievement.service";
import { GameService } from "../../services/game.service";

@Component({
    selector: "search-achievements-online",
    imports: [ButtonComponent, IconComponent, LoaderComponent],
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
    private readonly loaderService = inject(LoaderService);

    @Input({ required: true }) public gameId = "";
    @Input({ required: true }) public gameName = "";
    @Input({ required: true }) public origin!: AchievementSearchOriginEnum;
    @Input({ required: true }) public platform!: PlatformEnum;
    protected selectedGame = <GameFromOnline>{};
    protected retrievedGames = <GameFromOnline[]>[];
    protected iconEnum = IconEnum;
    protected loaderEnum = LoaderEnum;
    protected readonly gameSearchOriginEnum = AchievementSearchOriginEnum;

    public ngAfterContentInit(): void {
        this.searchGame();
    }

    public searchGame() {
        let service: Observable<any>;
        switch (this.origin) {
            case AchievementSearchOriginEnum.Steam:
                service = this.service.searchSteam(this.gameName);
                break;
            case AchievementSearchOriginEnum.PsnProfiles:
                service = this.service.searchPsnProfiles(this.gameName);
                break;
            case AchievementSearchOriginEnum.RetroAchievements:
                service = this.service.searchRetroAchievements(this.gameName, this.platform);
                break;
        }

        service.pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.SEARCH_ACHIEVEMENT_EXTERNAL)).subscribe({
            next: (result) => {
                this.retrievedGames = result;
            },
            error: () => {
                this.notificationService.error("Game not found");
            }
        });
    }

    public saveGame() {
        let service: Observable<any>;
        switch (this.origin) {
            case AchievementSearchOriginEnum.Steam:
                service = this.achievementsService.saveFromSteam(this.selectedGame.platformId, this.gameId);
                break;
            case AchievementSearchOriginEnum.PsnProfiles:
                service = this.achievementsService.saveFromPsn(this.selectedGame.url, this.gameId);
                break;
            case AchievementSearchOriginEnum.RetroAchievements:
                service = this.achievementsService.saveFromRetroAchievements(this.selectedGame.platformId, this.gameId);
                break;
        }

        service.pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.SAVE_ACHIEVEMENT_FROM_EXTERNAL)).subscribe({
            next: (result) => {
                this.activeModal.close(result);
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
