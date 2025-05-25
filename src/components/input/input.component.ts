import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

@Component({
    selector: "app-input",
    templateUrl: "./input.component.html",
    styleUrls: ["./input.component.scss"],
    standalone: true,
    imports: [FormsModule, NgxMaskDirective],
    providers: [provideNgxMask()]
})
export class InputComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public value!: string | number | undefined;
    @Input() public mask = "";
    @Input() public disabled = false;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public type = "text";
    @Input() public customClass = "";
    @Input() public name = crypto.randomUUID();
    @Input() public placeholder = "";
    @Input() public required = false;
    @Output() public valueChange = new EventEmitter();
    @Output() public onBlur = new EventEmitter();
    @Output() public onChange = new EventEmitter();

    public onFieldBlur(): void {
        this.valueChange.emit(this.value);

        if (this.onBlur.observed) {
            this.onBlur.emit(true);
        }
    }

    public onFieldChange(event: string): void {
        this.value = event;
        this.valueChange.emit(event);

        if (this.onChange.observed) {
            this.onChange.emit(true);
        }
    }
}
