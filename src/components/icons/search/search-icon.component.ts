import { NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "search-icon",
    templateUrl: "./search-icon.component.html",
    imports: [NgStyle]
})
export class SearchIconComponent {
    @Input() color: string = "#000";
    @Input() size: number | string = 24;
}
