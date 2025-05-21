import { Component, Input } from "@angular/core";
import { IconEnum } from "../../common/enums/icon.enum";

@Component({
    selector: "icon",
    templateUrl: "./icon.component.html",
    styleUrl: "./icon.component.scss"
})
export class IconComponent {
    @Input({ required: true }) public icon?: IconEnum = undefined;
    @Input() public size = 14;
    @Input() public customClass = "";
    @Input() public color = "#000";
}
