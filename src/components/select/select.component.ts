/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, HostBinding, Input, Output, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.scss"],
    imports: [NgSelectModule, FormsModule]
})
export class SelectComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public bindLabel = "";
    @Input({ required: true }) public value: any;
    @Input() public bindValue!: string;
    @Input() public customClass = "";
    @Input() public disabled = false;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public name = crypto.randomUUID();
    @Input() public placeholder = `Select...`;
    @Input() public required = false;
    @Input() public items = <any[]>[];
    @Output() public valueChange = new EventEmitter();
    @Output() public onChange = new EventEmitter();
    @ViewChild(NgSelectComponent, { static: false }) public select!: NgSelectComponent;

    public onFieldChange(): void {
        this.valueChange.emit(this.value);

        if (this.onChange.observed) {
            this.onChange.emit(true);
        }
    }
}
