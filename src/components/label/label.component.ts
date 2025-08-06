import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Component, HostBinding, inject, input } from "@angular/core";
import { Store } from "@ngxs/store";
import { LoaderState } from "../../common/store/loader.state";

@Component({
    selector: "app-label",
    templateUrl: "./label.component.html",
    styleUrl: "./label.component.scss",
    imports: [NgTemplateOutlet, AsyncPipe]
})
export class LabelComponent {
    public text = input<string | undefined | null>("");
    public textTemplate = input<any>();
    public label = input.required<string>();
    public inputSize = input<number>(12);
    protected isLoading$ = inject(Store).select(LoaderState.isLoading);

    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize()}`;
    }
}
