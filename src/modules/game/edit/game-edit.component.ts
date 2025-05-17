import { Component, Input } from "@angular/core";
import { StatusComponent } from "../../../components/status/status.component";
import { Game } from "../models/game.interface";
import { GameService } from "../services/game.service";

@Component({
    selector: "game",
    imports: [StatusComponent],
    templateUrl: "./game-edit.component.html",
    styleUrl: "./game-edit.component.css",
    providers: [GameService]
})
export class GameEditComponent {
    @Input() public game = <Game>{};
}
