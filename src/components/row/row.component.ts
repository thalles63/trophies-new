import { Component, Input } from "@angular/core";

@Component({
    selector: "row",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent {
    @Input() public customClass = "";
}
