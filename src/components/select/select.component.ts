/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, HostBinding, inject, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-select",
    templateUrl: "./select.component.html",
    styleUrls: ["./select.component.scss"],
    imports: [NgSelectModule, FormsModule, NgTemplateOutlet],
    providers: [TranslateService]
})
export class SelectComponent {
    private readonly translate = inject(TranslateService);

    @HostBinding("class") public get hostClass() {
        return `col-lg-${this.inputSize}`;
    }

    @Input({ required: true }) public bindLabel = "";
    @Input({ required: true }) public value: any;
    @Input() public bindValue!: string;
    @Input() public customClass = "";
    @Input() public clearable = false;
    @Input() public disabled = false;
    @Input() public searchable = true;
    @Input() public inputSize = 12;
    @Input() public label = "";
    @Input() public name = crypto.randomUUID();
    @Input() public placeholder = this.translate.instant("SELECT");
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
