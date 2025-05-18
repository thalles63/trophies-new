import { Component, inject, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { ButtonComponent } from "../../../../components/button/button.component";
import { InputComponent } from "../../../../components/input/input.component";
import { SelectComponent } from "../../../../components/select/select.component";
import { GameMapper } from "../../mappers/game.mapper";
import { Achievement } from "../../models/achievement.interface";
import { Game } from "../../models/game.interface";
import { TrueFalseData } from "../game-edit.data";
import { AchievementTypeData } from "./achievement-edit.data";

@Component({
    selector: "game",
    imports: [InputComponent, SelectComponent, ButtonComponent],
    templateUrl: "./achievement-edit.component.html",
    styleUrl: "./achievement-edit.component.scss"
})
export class AchievementEditComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly mapper = inject(GameMapper);

    @Input() public achievement = <Achievement>{};
    @Input() public game = <Game>{};
    protected trueFalse = TrueFalseData;
    protected achievementTypes = AchievementTypeData;
    protected platformEnum = PlatformEnum;

    public save() {
        if (this.achievement.dateAchievedConverted) {
            this.achievement.dateAchieved = this.mapper.convertDateToISOFormat(this.achievement.dateAchievedConverted);
        }

        this.activeModal.close(this.achievement);
    }

    public cancel() {
        this.activeModal.close();
    }
}
