import { Component, input, output } from "@angular/core";
import { IconEnum } from "../../common/enums/icon.enum";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: "app-button",
    imports: [IconComponent],
    templateUrl: "./button.component.html",
    styleUrl: "./button.component.scss"
})
export class ButtonComponent {
    public type = input("primary");
    public customClass = input("");
    public icon = input<IconEnum>();
    public iconSize = input<number>(14);
    public disabled = input(false);
    public onClick = output<Event>();

    protected iconEnum = IconEnum;

    public onClickHandler(event: Event) {
        this.onClick.emit(event);
    }
}
