import { DatePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IconEnum } from "../../../common/enums/icon.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { GameListSort } from "../../../common/sorts/game-list.sort";
import { IconComponent } from "../../../components/icon/icon.component";
import { StarRatingComponent } from "../../../components/rating/rating.component";
import { StatusComponent } from "../../../components/status/status.component";
import { Game } from "../../game/models/game.interface";

@Component({
    selector: "game-card",
    imports: [IconComponent, RouterLink, StarRatingComponent, DatePipe, IconComponent, StatusComponent],
    templateUrl: "./game-card.component.html",
    styleUrl: "./game-card.component.scss"
})
export class GameCardComponent {
    public game = input.required<Game>();
    public pageSort = input.required<number>();

    protected iconEnum = IconEnum;
    protected pageSortEnum = GameListSort;
    protected statusEnum = StatusEnum;
}
