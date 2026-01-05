import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { LoaderEnum } from "../../common/enums/loader.enum";
import { LoaderService } from "./loader.service";
@Component({
    selector: "loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
    private readonly loaderService = inject(LoaderService);

    public readonly loaderIds = input(<LoaderEnum[]>[]);
    public readonly singleLoadIds = input(<LoaderEnum[]>[]);
    public readonly type = input<"DEFAULT" | "MODAL">("DEFAULT");
    public readonly customClass = input<string>("");
    public readonly isSingleUse = input<boolean>(false);
    protected hasModalLoaded = false;
    public readonly isLoading = computed(() => {
        let loaderIds = this.loaderIds();
        let singleLoadIds = this.singleLoadIds();

        if (!loaderIds?.length && !singleLoadIds?.length) {
            return false;
        }

        if (singleLoadIds.some((id) => this.loaderService.isLoaderActive(id)())) {
            this.hasModalLoaded = true;
            return true;
        }

        return loaderIds.some((id) => this.loaderService.isLoaderActive(id)());
    });
}
