import { Component, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Game } from "../../models/game.interface";

@Component({
    selector: "search-game-by-name",
    templateUrl: "./search-game-by-name.component.html",
    styleUrls: ["./search-game-by-name.component.scss"],
    imports: [FormsModule]
})
export class SearchGameByNameComponent {
    public isLoadingSearchGame = input.required<boolean>();
    public games = input<Game[]>([]);
}
