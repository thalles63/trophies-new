import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GameSearchOriginEnum } from "../../../../common/enums/game-search-origin.enum";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { GameMapper } from "../../mappers/game.mapper";
import { GameFromOnline } from "../../models/game-from-online.interface";
import { GameService } from "../../services/game.service";

@Component({
    selector: "search-games-online",
    imports: [ButtonComponent, IconComponent],
    templateUrl: "./search-games-online.component.html",
    styleUrl: "./search-games-online.component.scss",
    providers: [GameService]
})
export class SearchGamesOnlineComponent implements AfterContentInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly service = inject(GameService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);
    private readonly mapper = inject(GameMapper);

    @Input() public gameId = "";
    @Input() public gameName = "";
    @Input() public title = "";
    @Input() public origin = GameSearchOriginEnum.IGDB;
    protected selectedGame = <GameFromOnline>{};
    protected retrievedGames = <GameFromOnline[]>[];
    protected isLoading = false;
    protected isSaveLoading = false;
    protected iconEnum = IconEnum;

    public ngAfterContentInit(): void {
        this.searchGame();
    }

    private searchGame() {
        this.isLoading = true;

        const service = this.origin === GameSearchOriginEnum.IGDB ? this.service.searchIgdb(this.gameName) : this.service.searchHltb(this.gameName);

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

    public selectGame(game: GameFromOnline): void {
        this.selectedGame = game;
    }

    public confirm() {
        if (this.origin === GameSearchOriginEnum.HLTB) {
            this.activeModal.close(this.mapper.getInHltb(this.selectedGame));
            return;
        }

        this.activeModal.close(this.mapper.getInIgdb(this.selectedGame));
    }

    public cancel() {
        this.activeModal.close();
    }
}
