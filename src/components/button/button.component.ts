import { Component, input, output } from "@angular/core";

@Component({
    selector: "app-button",
    imports: [],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss"
})
export class ButtonComponent {
    public type = input("primary");
    public customClass = input("");
    public disabled = input(false);
    public onClick = output();

    public onClickHandler() {
        this.onClick.emit();
    }
}
