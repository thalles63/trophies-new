import { animate, style, transition, trigger } from "@angular/animations";
import { Component, EventEmitter, HostListener, input, Input, Output } from "@angular/core";

@Component({
    selector: "lightbox",
    standalone: true,
    animations: [
        trigger("fade", [
            transition(":enter", [style({ opacity: 0 }), animate("200ms ease-out", style({ opacity: 1 }))]),
            transition(":leave", [animate("200ms ease-in", style({ opacity: 0 }))])
        ]),
        trigger("zoom", [
            transition(":enter", [style({ transform: "scale(0.9)", opacity: 0 }), animate("200ms ease-out", style({ transform: "scale(1)", opacity: 1 }))]),
            transition(":leave", [animate("150ms ease-in", style({ transform: "scale(0.9)", opacity: 0 }))])
        ])
    ],
    templateUrl: "./lightbox.component.html",
    styleUrl: "./lightbox.component.scss"
})
export class LightboxComponent {
    public images = input([], {
        transform: (images: string[]) => {
            return images.map((image) => image.replace("t_screenshot_med", "t_1080p_2x"));
        }
    });
    @Input() index = 0;
    @Output() close = new EventEmitter<void>();
    animate = false;

    @HostListener("window:keydown.escape")
    onEsc() {
        this.close.emit();
    }

    ngOnChanges() {
        this.animate = false;
    }

    onImageLoaded() {
        this.animate = true;
    }

    prev() {
        this.index = (this.index - 1 + this.images().length) % this.images().length;
        this.animate = false;
    }

    next() {
        this.index = (this.index + 1) % this.images().length;
        this.animate = false;
    }
}
