import { Component, input, output } from "@angular/core";

@Component({
    selector: "app-button",
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.css"
})
export class ButtonComponent {
    public type = input("primary");
    public label = input.required<string>();
    public onClick = output();

    public onClickHandler() {
        this.onClick.emit();
    }
}
