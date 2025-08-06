import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "game-achievement-skeleton",
    templateUrl: "./achievement-skeleton.component.html",
    styleUrl: "./achievement-skeleton.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailAchievementSkeletonComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-4`;
    }
}
