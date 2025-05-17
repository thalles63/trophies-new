import { Component, inject } from "@angular/core";
import { Store } from "@ngxs/store";
import { CoreState } from "../../common/store/core.state";

@Component({
    selector: "app-header",
    imports: [],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css"
})
export class HeaderComponent {
    private readonly store = inject(Store);

    screenshot = this.store.selectSignal(CoreState.backgroundScreenshot);
}
