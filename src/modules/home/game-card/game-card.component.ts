import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconEnum } from "../../../common/enums/icon.enum";
import { IconComponent } from "../../../components/icon/icon.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { Game } from "../../game/models/game.interface";

@Component({
    selector: "game-card",
    imports: [IconComponent, RouterLink, StarRatingComponent],
    templateUrl: "./game-card.component.html",
    styleUrl: "./game-card.component.scss"
})
export class GameCardComponent {
    public game = input.required<Game>();

    protected iconEnum = IconEnum;
}
