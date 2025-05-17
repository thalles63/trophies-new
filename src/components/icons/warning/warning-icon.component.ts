// attention-icon.component.ts
import { Component, Input } from "@angular/core";

@Component({
    selector: "warning-icon",
    templateUrl: "./warning-icon.component.html"
})
export class WarningIconComponent {
    @Input() color: string = "";
    @Input() size: number | string = 24;
}
