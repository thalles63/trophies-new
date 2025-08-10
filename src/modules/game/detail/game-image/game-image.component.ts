import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { IconComponent } from "../../../../components/icon/icon.component";
import { StarRatingComponent } from "../../../../components/rating/rating.component";
import { StatusComponent } from "../../../../components/status/status.component";
import { Game } from "../../models/game.interface";

@Component({
    selector: "game-image",
    templateUrl: "./game-image.component.html",
    styleUrl: "./game-image.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, StarRatingComponent, DatePipe, StatusComponent, RouterLink]
})
export class GameDetailGameImageComponent {
    public game = input.required<Game>();
    public showDetails = input(true);
    public onClick = output();
    protected iconEnum = IconEnum;
    protected platformEnum = PlatformEnum;

    public onClickHandler() {
        this.onClick.emit();
    }
}
