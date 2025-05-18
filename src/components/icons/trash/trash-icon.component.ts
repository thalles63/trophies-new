import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "trash-icon",
    templateUrl: "./trash-icon.component.html",
    imports: [NgStyle]
})
export class TrashIconComponent {
    @Input() color: string = "#000";
    @Input() size: number | string = 24;
}
