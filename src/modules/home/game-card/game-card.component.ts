import { DatePipe, DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { PlatformEnum } from "../../../common/enums/platform.enum";
import { StatusEnum } from "../../../common/enums/status.enum";
import { GameList } from "../../game/models/game-list.interface";

@Component({
    selector: "game-card",
    templateUrl: "./game-card.component.html",
    styleUrl: "./game-card.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, DatePipe, DecimalPipe, TranslatePipe]
})
export class HomeGameCardComponent {
    public game = input.required<GameList>();
    public onClick = output();
    protected readonly statusEnum = StatusEnum;
    protected platformEnum = PlatformEnum;

    public onClickHandler() {
        this.onClick.emit();
    }
}
