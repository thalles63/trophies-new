import { Component, ElementRef, input, ViewChild } from "@angular/core";
import { LightboxComponent } from "./lightbox/lightbox.component";

@Component({
    selector: "game-screenshots",
    templateUrl: "./game-screenshots.component.html",
    styleUrl: "./game-screenshots.component.scss",
    imports: [LightboxComponent]
})
export class GameDetailGameScreenshotsComponent {
    public screenshots = input.required<string[]>();
    public isLoading = input(false);
    private readonly scrollAmount = 600;
    protected opened = false;
    protected currentIndex = 0;

    @ViewChild("carousel", { static: false }) carousel!: ElementRef<HTMLDivElement>;

    public scrollLeft() {
        this.carousel.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: "smooth" });
    }

    public scrollRight() {
        this.carousel.nativeElement.scrollBy({ left: this.scrollAmount, behavior: "smooth" });
    }

    public open(i: number) {
        this.currentIndex = i;
        this.opened = true;
    }
}
