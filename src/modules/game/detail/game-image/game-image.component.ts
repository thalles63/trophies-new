import { DatePipe, DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { IconComponent } from "../../../../components/icon/icon.component";
import { StarRatingComponent } from "../../../../components/rating/rating.component";
import { StatusComponent } from "../../../../components/status/status.component";
import { Game } from "../../models/game.interface";

import { StatusEnum } from "../../../../common/enums/status.enum";

@Component({
    selector: "game-image",
    templateUrl: "./game-image.component.html",
    styleUrl: "./game-image.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, StarRatingComponent, DatePipe, StatusComponent, RouterLink, DecimalPipe]
})
export class GameDetailGameImageComponent {
    public game = input.required<Game>();
    public showDetails = input(true);
    public onClick = output<void>();
    protected readonly statusEnum = StatusEnum;
    protected readonly iconEnum = IconEnum;
    protected platformEnum = PlatformEnum;

    public onClickHandler() {
        this.onClick.emit();
    }
}
