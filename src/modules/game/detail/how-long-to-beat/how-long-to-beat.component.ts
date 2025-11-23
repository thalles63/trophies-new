import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IconEnum } from "../../../../common/enums/icon.enum";
import { MinutesToReadablePipe } from "../../../../common/pipes/minutes-to-readable.pipe";
import { Game } from "../../models/game.interface";

@Component({
    selector: "game-how-long-to-beat",
    templateUrl: "./how-long-to-beat.component.html",
    styleUrl: "./how-long-to-beat.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MinutesToReadablePipe]
})
export class GameHowLongToBeatComponent {
    public game = input.required<Game>();
    public isLoading = input(false);
    public icon = IconEnum;
}
