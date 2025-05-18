import { Component, input, output } from "@angular/core";

@Component({
    selector: "tab",
    templateUrl: "./tab.component.html"
})
export class TabComponent {
    public active = false;
    public tabTitle = input<string>();
    public disabled = input(false);
    public onClick = output();

    public handleTabClick() {
        if (this.disabled()) {
            return;
        }

        this.active = true;
        this.onClick.emit();
    }
}
