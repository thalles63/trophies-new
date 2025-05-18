import { Component, input } from "@angular/core";

@Component({
    selector: "status",
    templateUrl: "./status.component.html",
    styleUrl: "./status.component.scss"
})
export class StatusComponent {
    public type = input.required<string>();
}
