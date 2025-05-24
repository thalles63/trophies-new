import { AfterViewInit, Component, DestroyRef, inject, Input, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AchievementActionEnum } from "../../../common/enums/achievement-action.enum";
import { IconEnum } from "../../../common/enums/icon.enum";
import { PlatformEnum } from "../../../common/enums/platform.enum";
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
    private readonly achievementsService = inject(AchievementsService);
    private readonly mapper = inject(GameMapper);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly notificationService = inject(NotificationService);

    @Input() public game = <Game>{ timePlayed: {} };
    @ViewChild("tabs", { static: false }) protected readonly tabs!: TabsComponent;
    @ViewChild("gameInfoTab", { static: false }) private readonly gameInfoTab!: TabComponent;

    protected statusEnum = StatusEnum;
    protected platforms = PlatformsData;
    protected iconEnum = IconEnum;
    protected trueFalse = TrueFalseData;
    protected achievementsModified = <Achievement[]>[];
    protected isSaveLoading = false;

    public ngAfterViewInit(): void {
        this.tabs.setActiveTab(this.gameInfoTab);
    }

    public save() {
        this.deleteAchievements();
        this.updateAchievements();
        this.saveAchievements();

        this.saveGame();
    }

    private saveGame() {
        if (!this.validateIfRequiredFieldsAreValid()) {
            this.notificationService.error("Some required fields are invalid");
            return;
        }

        this.isSaveLoading = true;
        const service = this.game.id ? this.service.update(this.game) : this.service.save(this.game);

        service.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!this.game.id) {
                this.router.navigate(["game/" + result.id], { replaceUrl: true });
            }

            this.activeModal.close(this.game);
        });
    }

    public addNewAchievement() {
        const modalRef = this.modalService.open(AchievementEditComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.achievement = {};
        modalRef.componentInstance.game = this.game;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            result.action = AchievementActionEnum.Add;

            this.achievementsModified.replaceOrUnshift(result);
            this.game.achievements.push(result);
            this.game.achievements = this.game.achievements.sortByField([
                { fieldName: "isAchieved", direction: SortDirection.Ascending },
                { fieldName: "dateAchieved", direction: SortDirection.Descending }
            ]);
        });
    }

    private validateIfRequiredFieldsAreValid() {
        return !!this.game.status && !!this.game.name && !!this.game.screenshot && !!this.game.image && !!this.game.platform;
    }

    public openSearchIgdbModal() {
        if (!this.game.name) {
            this.notificationService.error("Invalid game name");
            return;
        }

        const modalRef = this.modalService.open(SearchGameInIgdbComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.game = this.game;
        modalRef.componentInstance.gameName = this.game.name;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.updateGameWithIgdbInfo(result);
        });
    }

    private updateGameWithIgdbInfo(igdbInfo: Game) {
        this.game.screenshot = igdbInfo.screenshot;
        this.game.image = igdbInfo.image;
        this.game.description = igdbInfo.description;
        this.game.name = igdbInfo.name;

        if (![PlatformEnum.Playstation4, PlatformEnum.Playstation5].includes(this.game.platform)) {
            this.game.igdbId = igdbInfo.igdbId;
        }
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
        this.service
            .delete(this.game.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.activeModal.close();
                this.router.navigate(["/"]);
            });
    }

    private saveAchievements() {
        const achievemenstToSave = this.achievementsModified.filter((a) => a.action === AchievementActionEnum.Add);
        if (!achievemenstToSave.length) {
            return;
        }

        this.isSaveLoading = true;
        this.achievementsService
            .saveAchievements(achievemenstToSave, this.game.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isSaveLoading = false;
            });
    }

    private deleteAchievements() {
        const achievemenstToDelete = this.achievementsModified.filter((a) => a.action === AchievementActionEnum.Delete);
        if (!achievemenstToDelete.length) {
            return;
        }

        this.isSaveLoading = true;
        this.achievementsService
            .deleteAchievements(achievemenstToDelete)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isSaveLoading = false;
            });
    }

    private updateAchievements() {
        const achievemenstToUpdate = this.achievementsModified.filter((a) => a.action === AchievementActionEnum.Edit);
        if (!achievemenstToUpdate.length) {
            return;
        }

        this.isSaveLoading = true;
        this.achievementsService
            .updateAchievements(achievemenstToUpdate)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isSaveLoading = false;
            });
    }

    public cancel() {
        if (!this.game.id) {
            this.router.navigate(["/"]);
        }

        this.activeModal.close();
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

            if (result.id) {
                result.action = AchievementActionEnum.Edit;
            }

            this.achievementsModified.replaceOrUnshift(result);
            this.game.achievements[index] = result;
            this.game.achievements = this.game.achievements.sortByField([
                { fieldName: "isAchieved", direction: SortDirection.Ascending },
                { fieldName: "dateAchieved", direction: SortDirection.Descending }
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

            this.deleteAchievement(listIndex);
        });
    }

    private deleteAchievement(listIndex: number) {
        const achievement = { ...this.game.achievements[listIndex] };
        if (achievement.id) {
            achievement.action = AchievementActionEnum.Delete;
        } else {
            this.achievementsModified.splice(listIndex, 1);
        }

        this.achievementsModified.replaceOrUnshift(achievement);
        this.game.achievements.splice(listIndex, 1);
    }

    public setStatus(status: number) {
        this.game.status = status;
        this.game.statusDescription = GameStatusData.find((s) => s.id === status)!.description;
    }
}
