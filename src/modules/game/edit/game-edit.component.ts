import { AfterViewInit, Component, DestroyRef, inject, Input, ViewChild } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IconEnum } from "../../../common/enums/icon.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { ButtonComponent } from "../../../components/button/button.component";
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
import { GameService } from "../services/game.service";
import { AchievementEditComponent } from "./achievement-edit/achievement-edit.component";
import { GameStatusData, PlatformsData, TrueFalseData } from "./game-edit.data";
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
    providers: [GameService]
})
export class GameEditComponent implements AfterViewInit {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly modalService = inject(NgbModal);
    private readonly service = inject(GameService);
    private readonly mapper = inject(GameMapper);
    private readonly destroyRef = inject(DestroyRef);

    @Input() public game = <Game>{};
    @ViewChild("tabs", { static: false }) protected readonly tabs!: TabsComponent;
    @ViewChild("gameInfoTab", { static: false }) private readonly gameInfoTab!: TabComponent;

    protected statusEnum = StatusEnum;
    protected platforms = PlatformsData;
    protected iconEnum = IconEnum;
    protected trueFalse = TrueFalseData;
    protected achievementsToUpdateInApi = <Achievement[]>[];
    protected achievementsToDeleteInApi = <Achievement[]>[];

    public ngAfterViewInit(): void {
        this.tabs.setActiveTab(this.gameInfoTab);
    }

    public save() {
        this.deleteAchievements();
        this.updateAchievements();
        this.updateGame();
    }

    private updateGame() {
        this.service
            .update(this.game)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.activeModal.close(this.game);
            });
    }

    private deleteAchievements() {
        if (!this.achievementsToDeleteInApi.length) {
            return;
        }

        this.service.deleteAchievements(this.achievementsToDeleteInApi).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    private updateAchievements() {
        if (!this.achievementsToUpdateInApi.length) {
            return;
        }

        this.service.updateAchievements(this.achievementsToUpdateInApi).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    public cancel() {
        this.activeModal.close();
    }

    public editAchievement(achievement: Achievement, index: number) {
        const achievementToEdit = { ...achievement };
        achievementToEdit.dateAchievedConverted = this.mapper.convertDateToFieldFormat(achievementToEdit.dateAchieved);

        const modalRef = this.modalService.open(AchievementEditComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.achievement = achievementToEdit;
        modalRef.componentInstance.game = this.game;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.achievementsToUpdateInApi.replaceOrUnshift(result);
            this.game.achievements[index] = result;
            this.game.achievements = this.game.achievements.sortByField("dateAchieved");
        });
    }

    public deleteAchievement(achievement: Achievement, listIndex: number) {
        this.achievementsToDeleteInApi.push(this.game.achievements[listIndex]);

        const achievementInUpdateListIndex = this.achievementsToUpdateInApi.findIndex((ach) => ach.index === achievement.index);
        if (achievementInUpdateListIndex >= 0) {
            this.achievementsToUpdateInApi.splice(achievementInUpdateListIndex, 1);
        }

        this.game.achievements.splice(listIndex, 1);
    }

    public setStatus(status: number) {
        this.game.status = status;
        this.game.statusDescription = GameStatusData.find((s) => s.id === status)!.description;
    }
}
