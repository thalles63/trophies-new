import { Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { ButtonComponent } from "../../../../components/button/button.component";
import { InputComponent } from "../../../../components/input/input.component";
import { SelectComponent } from "../../../../components/select/select.component";
import { GameMapper } from "../../mappers/game.mapper";
import { Achievement } from "../../models/achievement.interface";
import { TrueFalseData } from "../../models/game-edit.data";
import { Game } from "../../models/game.interface";
import { AchievementsService } from "../../services/achievement.service";
import { AchievementTypeData } from "./achievement-edit.data";

@Component({
    selector: "game-edit",
    imports: [InputComponent, SelectComponent, ButtonComponent],
    templateUrl: "./achievement-edit.component.html",
    styleUrl: "./achievement-edit.component.scss",
    providers: [AchievementsService]
})
export class AchievementEditComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly achievementsService = inject(AchievementsService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly mapper = inject(GameMapper);

    @Input() public achievement = <Achievement>{};
    @Input() public game = <Game>{};
    protected trueFalse = TrueFalseData;
    protected achievementTypes = AchievementTypeData;
    protected platformEnum = PlatformEnum;
    protected isSaveLoading = false;

    public save() {
        this.isSaveLoading = true;

        if (this.achievement.dateAchievedConverted) {
            this.achievement.dateAchieved = this.mapper.convertDateToISOFormat(this.achievement.dateAchievedConverted);
        }

        this.achievementsService
            .edit(this.achievement, this.game.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isSaveLoading = false;
                this.activeModal.close(this.achievement);
            });
    }

    public cancel() {
        this.activeModal.close();
    }
}
