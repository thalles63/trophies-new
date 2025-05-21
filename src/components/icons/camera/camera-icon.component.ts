import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "camera-icon",
    templateUrl: "./camera-icon.component.html",
    imports: [NgStyle]
})
export class CameraIconComponent {
    @Input() color: string = "#000";
    @Input() size: number | string = 24;
}
