import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "trophy-icon",
    imports: [NgStyle],
    templateUrl: "./trophy-icon.component.html"
})
export class TrophyIconComponent {
    @Input() color = "";
    @Input() size = 24;
}
