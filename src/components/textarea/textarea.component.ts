import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
@Component({
    selector: "app-textarea",
    templateUrl: "./textarea.component.html",
    styleUrls: ["../input/input.component.scss", "./textarea.component.scss"],
    imports: [FormsModule]
})
export class TextareaComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public value!: string;
    @Input() public disabled = false;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public customClass = "";
    @Input() public rows = 5;
    @Input() public name = crypto.randomUUID();
    @Input() public required = false;
    @Output() public valueChange = new EventEmitter();

    public onType(): void {
        this.valueChange.emit(this.value);
    }
}
