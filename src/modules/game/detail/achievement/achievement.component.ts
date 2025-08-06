import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, HostBinding, input } from "@angular/core";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { IconComponent } from "../../../../components/icon/icon.component";
import { Achievement } from "../../models/achievement.interface";

@Component({
    selector: "game-achievement",
    templateUrl: "./achievement.component.html",
    styleUrl: "./achievement.component.scss",
    imports: [IconComponent, DatePipe, DecimalPipe]
})
export class GameDetailAchievementComponent {
    public achievement = input.required<Achievement>();
    protected iconEnum = IconEnum;

    @HostBinding("class") public get hostClass() {
        return `col-lg-4`;
    }
}
