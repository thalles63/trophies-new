import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { WarningIconComponent } from "../../../components/icons/warning/warning-icon.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { Game } from "../../game/models/game.interface";

@Component({
    selector: "game-card",
    imports: [WarningIconComponent, RouterLink, StarRatingComponent],
    templateUrl: "./game-card.component.html",
    styleUrl: "./game-card.component.css"
})
export class GameCardComponent {
    public game = input.required<Game>();
}
