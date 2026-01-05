import { Component, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Game } from "../../models/game.interface";

@Component({
    selector: "search-game-dropdown",
    templateUrl: "./search-game-dropdown.component.html",
    styleUrls: ["./search-game-dropdown.component.scss"],
    imports: [FormsModule]
})
export class SearchGameByNameComponent {
    public games = input<Game[]>([]);
}
