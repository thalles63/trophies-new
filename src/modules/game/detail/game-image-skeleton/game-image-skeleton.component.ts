import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
    selector: "game-image-skeleton",
    templateUrl: "./game-image-skeleton.component.html",
    styleUrl: "./game-image-skeleton.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailGameImageSkeletonComponent {
    public showDetails = input(true);
}
