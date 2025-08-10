import { ChangeDetectionStrategy, Component, computed, inject, model, OnDestroy, output, Renderer2 } from "@angular/core";

@Component({
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnDestroy {
    private readonly renderer = inject(Renderer2);
    public readonly active = model(false);
    public readonly onBackdropClick = output();

    public shouldShowSidebar = computed(() => {
        const active = this.active();

        if (active) {
            this.renderer.addClass(document.body, "no-scroll");
        } else {
            this.renderer.removeClass(document.body, "no-scroll");
        }

        return this.active();
    });

    public onBackdropClickHandler() {
        this.onBackdropClick.emit();
    }

    public toggleSidebar(active: boolean): void {
        this.active.set(active);
    }

    public ngOnDestroy(): void {
        if (this.active()) {
            this.toggleSidebar(false);
        }
    }
}
