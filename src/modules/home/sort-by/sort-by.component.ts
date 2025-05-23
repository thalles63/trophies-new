import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Sort } from "../../../common/models/sort.interface";

@Component({
    selector: "sort-by",
    imports: [],
    templateUrl: "./sort-by.component.html",
    styleUrl: "./sort-by.component.scss"
})
export class SortByComponent implements OnInit {
    @Input() sort = 2;
    @Input() sorts = <Sort[]>[];
    @Output() onSelect = new EventEmitter();

    protected selectedSort = <Sort>{};

    public ngOnInit(): void {
        this.selectedSort = this.sorts.find((s) => s.id === this.sort)!;
    }

    public selectSort(sort: Sort) {
        this.selectedSort = sort;
        this.sort = sort.id;
        this.onSelect.emit(sort.id);
    }
}
