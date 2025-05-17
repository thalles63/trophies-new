import { Component, input } from "@angular/core";

@Component({
    selector: "status",
    imports: [],
    templateUrl: "./status.component.html",
    styleUrl: "./status.component.css"
})
export class StatusComponent {
    public type = input.required<string>();
}
