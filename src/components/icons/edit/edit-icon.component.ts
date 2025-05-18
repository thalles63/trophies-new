import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "edit-icon",
    templateUrl: "./edit-icon.component.html",
    imports: [NgStyle]
})
export class EditIconComponent {
    @Input() color: string = "#000";
    @Input() size: number | string = 24;
}
