/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.scss"],
    imports: [NgSelectModule, FormsModule, NgTemplateOutlet]
})
export class SelectComponent {
    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public bindLabel = "";
    @Input({ required: true }) public value: any;
    @Input() public bindValue!: string;
    @Input() public customClass = "";
    @Input() public clearable = false;
    @Input() public disabled = false;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public name = crypto.randomUUID();
    @Input() public placeholder = `Select...`;
    @Input() public required = false;
    @Input() public items = <any[]>[];
    @Input() public itemTemplate?: TemplateRef<unknown>;
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
