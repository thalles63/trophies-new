import { NgStyle } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "star-rating",
    imports: [NgStyle],
    templateUrl: "./rating.component.html",
    styleUrl: "./rating.component.css"
})
export class StarRatingComponent {
    @Input() rating: number = 0;
    @Input() color: string = "";
    @Input() colorSelected: string = "";
    @Input() size: number = 24;
    @Input() isSelectable = false;
    @Output() ratingChange = new EventEmitter<number>();

    hovered: number = 0;
    stars = Array(5).fill(0);

    onHover(event: MouseEvent, starIndex: number) {
        if (!this.isSelectable) {
            return;
        }

        const rect = (event.target as SVGElement).getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const width = rect.width;
        const isHalf = mouseX < width / 2;
        this.hovered = starIndex - (isHalf ? 0.5 : 0);
    }

    onClick(starIndex: number) {
        if (!this.isSelectable) {
            return;
        }

        this.rating = this.hovered || starIndex;
        this.ratingChange.emit(this.rating);
    }

    getFill(index: number): string {
        const value = this.hovered || this.rating;
        if (value >= index) {
            return this.colorSelected;
        } else if (value >= index - 0.5) {
            return `url(#half-gradient-${index - 1})`;
        } else {
            return this.color;
        }
    }
}
