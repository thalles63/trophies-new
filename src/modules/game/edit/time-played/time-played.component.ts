import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TimePlayed } from "./time-played.interface";

@Component({
    selector: "time-played",
    templateUrl: "./time-played.component.html",
    styleUrls: ["../../../../components/input/input.component.scss", "./time-played.component.scss"],
    imports: [FormsModule]
})
export class TimePlayedComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public value = <TimePlayed>{};
    @Input() public disabled = false;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public customClass = "";
    @Input() public name = crypto.randomUUID();
    @Input() public required = false;
    @Output() public valueChange = new EventEmitter();

    protected hours = "";
    protected minutes = "";

    public onFieldBlur(): void {
        this.valueChange.emit(this.value);
    }

    public onFieldChange(): void {
        this.valueChange.emit(this.value);
    }
}
