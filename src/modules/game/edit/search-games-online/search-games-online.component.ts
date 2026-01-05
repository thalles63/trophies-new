import { AfterContentInit, Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { GameSearchOriginEnum } from "../../../../common/enums/game-search-origin.enum";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { LoaderEnum } from "../../../../common/enums/loader.enum";
import { NotificationService } from "../../../../common/services/notification.service";
import { ButtonComponent } from "../../../../components/button/button.component";
import { IconComponent } from "../../../../components/icon/icon.component";
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { LoaderService } from "../../../../components/loader/loader.service";
import { GameMapper } from "../../mappers/game.mapper";
import { GameFromOnline } from "../../models/game-from-online.interface";
import { GameService } from "../../services/game.service";

@Component({
    selector: "search-games-online",
    imports: [ButtonComponent, IconComponent, LoaderComponent],
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
    private readonly loaderService = inject(LoaderService);

    @Input() public gameId = "";
    @Input() public gameName = "";
    @Input() public title = "";
    @Input() public origin = GameSearchOriginEnum.IGDB;
    protected selectedGame = <GameFromOnline>{};
    protected retrievedGames = <GameFromOnline[]>[];
    protected iconEnum = IconEnum;
    protected loaderEnum = LoaderEnum;

    public ngAfterContentInit(): void {
        this.searchGame();
    }

    private searchGame() {
        let service;

        if (this.origin === GameSearchOriginEnum.IGDB) {
            service = this.service.searchIgdb(this.gameName);
        } else if (this.origin === GameSearchOriginEnum.HLTB) {
            service = this.service.searchHltb(this.gameName);
        } else {
            service = this.service.searchItad(this.gameName);
        }

        service.pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.SEARCH_GAME_EXTERNAL)).subscribe({
            next: (result) => {
                this.retrievedGames = result;
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

        if (this.origin === GameSearchOriginEnum.ITAD) {
            this.activeModal.close(this.mapper.getInItad(this.selectedGame));
            return;
        }

        this.activeModal.close(this.mapper.getInIgdb(this.selectedGame));
    }

    public cancel() {
        this.activeModal.close();
    }
}
