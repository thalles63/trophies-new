import { AfterViewInit, Component, DestroyRef, inject, Input, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IconEnum } from "../../../common/enums/icon.enum";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { NotificationService } from "../../../common/services/notification.service";
import { ButtonComponent } from "../../../components/button/button.component";
import { ConfirmationComponent } from "../../../components/confirmation/confirmation.component";
import { IconComponent } from "../../../components/icon/icon.component";
import { InputComponent } from "../../../components/input/input.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { SelectComponent } from "../../../components/select/select.component";
import { TabComponent } from "../../../components/tabs/tab/tab.component";
import { TabsComponent } from "../../../components/tabs/tabs.component";
import { TextareaComponent } from "../../../components/textarea/textarea.component";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";
import { Game } from "../models/game.interface";
import { AchievementsService } from "../services/achievement.service";
import { GameService } from "../services/game.service";
import { AchievementEditComponent } from "./achievement-edit/achievement-edit.component";
import { GameStatusData, PlatformsData, TrueFalseData } from "./game-edit.data";
import { SearchGameInIgdbComponent } from "./search-igdb/search-igdb.component";
import { SearchGameInPsnComponent } from "./search-psn/search-psn.component";
import { SearchGameInSteamComponent } from "./search-steam/search-steam.component";
import { TimePlayedComponent } from "./time-played/time-played.component";

@Component({
    selector: "game",
    imports: [
        TabsComponent,
        TabComponent,
        InputComponent,
        SelectComponent,
        TextareaComponent,
        StarRatingComponent,
        TimePlayedComponent,
        ButtonComponent,
        IconComponent
    ],
    templateUrl: "./game-edit.component.html",
    styleUrl: "./game-edit.component.scss",
    providers: [GameService, AchievementsService]
})
export class GameEditComponent implements AfterViewInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly modalService = inject(NgbModal);
    private readonly service = inject(GameService);
    private readonly mapper = inject(GameMapper);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly notificationService = inject(NotificationService);
    private readonly achievementsService = inject(AchievementsService);

    @Input() public game = <Game>{ timePlayed: {}, achievements: <Achievement[]>[] };
    @ViewChild("tabs", { static: false }) protected readonly tabs!: TabsComponent;
    @ViewChild("gameInfoTab", { static: false }) private readonly gameInfoTab!: TabComponent;

    protected statusEnum = StatusEnum;
    protected platforms = PlatformsData;
    protected iconEnum = IconEnum;
    protected trueFalse = TrueFalseData;
    protected isSaveLoading = false;
    protected isDeleteLoading = false;
    protected isDeleteAchievementLoading = false;

    public ngAfterViewInit(): void {
        this.tabs.setActiveTab(this.gameInfoTab);
    }

    public save() {
        if (!this.validateIfRequiredFieldsAreValid()) {
            this.notificationService.error("Some required fields are invalid");
            return;
        }

        this.isSaveLoading = true;
        const service = this.isManualRegister() ? this.service.save(this.game) : this.service.update(this.game);

        service.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            this.isSaveLoading = false;

            if (this.isManualRegister()) {
                this.router.navigate(["game/" + result.id], { replaceUrl: true });
                this.activeModal.close(true);
                return;
            }

            this.activeModal.close(true);
        });
    }

    private validateIfRequiredFieldsAreValid() {
        return !!this.game.name;
    }

    public openSearchIgdbModal() {
        if (!this.game.name) {
            this.notificationService.error("Invalid game name");
            return;
        }

        const modalRef = this.modalService.open(SearchGameInIgdbComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.gameId = this.game.id;
        modalRef.componentInstance.gameName = this.game.name;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.updateGameWithIgdbInfo(result);
        });
    }

    private updateGameWithIgdbInfo(igdbInfo: Game) {
        this.game = { ...this.game, ...igdbInfo };
    }

    public confirmDeleteGame() {
        const modalRef = this.modalService.open(ConfirmationComponent, { centered: true, size: "md" });
        modalRef.componentInstance.body = "Do you really wish do delete the game: " + this.game.name;
        modalRef.componentInstance.title = "Delete game";

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.deleteGame();
        });
    }

    private deleteGame() {
        this.isDeleteLoading = true;
        this.service
            .delete(this.game.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isDeleteLoading = false;

                this.activeModal.close();
                this.router.navigate(["/"]);
            });
    }
    public cancel() {
        if (this.isManualRegister()) {
            this.router.navigate(["/"]);
        }

        this.activeModal.close(true);
    }

    public isManualRegister() {
        return !this.game.id;
    }

    public searchAchievementsInSteam() {
        if (!this.game.name) {
            this.notificationService.error("Invalid game name");
            return;
        }

        const modalRef = this.modalService.open(SearchGameInSteamComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.gameId = this.game.id;
        modalRef.componentInstance.gameName = this.game.name;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game.achievements = result;
        });
    }

    public syncAchievementsWithPsnProfiles() {
        const modalRef = this.modalService.open(SearchGameInPsnComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.gameId = this.game.id;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game.achievements = result;
        });
    }

    public editAchievement(achievement: Achievement, index: number) {
        const achievementToEdit = { ...achievement };
        if (achievementToEdit.dateAchieved) {
            achievementToEdit.dateAchievedConverted = this.mapper.convertDateToFieldFormat(achievementToEdit.dateAchieved);
        }

        const modalRef = this.modalService.open(AchievementEditComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.achievement = achievementToEdit;
        modalRef.componentInstance.game = this.game;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.game.achievements[index] = result;
            this.game.achievements = this.game.achievements.sortByField([
                { fieldName: "isAchieved", direction: SortDirection.Descending },
                { fieldName: "dateAchieved", direction: SortDirection.Ascending },
                { fieldName: "percentageAchieved", direction: SortDirection.Descending }
            ]);
        });
    }

    public confirmDeleteAchievement(achievement: Achievement, listIndex: number) {
        const modalRef = this.modalService.open(ConfirmationComponent, { centered: true, size: "md" });
        modalRef.componentInstance.body = "Do you really wish do delete the achievement: " + achievement.name;
        modalRef.componentInstance.title = "Delete achievement";

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.deleteAchievementFromApi(achievement, listIndex);
        });
    }

    private deleteAchievementFromApi(achievementToDelete: Achievement, listIndex: number) {
        this.isDeleteAchievementLoading = true;

        this.achievementsService
            .deleteAchievement(achievementToDelete, achievementToDelete.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isDeleteAchievementLoading = false;
                this.deleteAchievement(listIndex);
            });
    }

    private deleteAchievement(listIndex: number) {
        this.game.achievements.splice(listIndex, 1);
    }

    public setStatus(status: number) {
        this.game.status = status;
        this.game.statusDescription = GameStatusData.find((s) => s.id === status)!.description;
    }
}
