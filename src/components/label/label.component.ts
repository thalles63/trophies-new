import { NgTemplateOutlet } from "@angular/common";
import { Component, HostBinding, input } from "@angular/core";

@Component({
    selector: "app-label",
    templateUrl: "./label.component.html",
    styleUrl: "./label.component.scss",
    imports: [NgTemplateOutlet]
})
export class LabelComponent {
    public text = input<string | undefined | null>("");
    public textTemplate = input<any>();
    public label = input.required<string>();
    public inputSize = input<number>(12);
    public isLoading = input(false);

    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize()}`;
    }
}
