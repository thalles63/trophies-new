import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngxs/store";
import { UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "app-header",
    imports: [RouterLink, ButtonComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent {
    private readonly store = inject(Store);
    private readonly router = inject(Router);

    protected screenshot = this.store.selectSignal(CoreState.backgroundScreenshot);

    public addGame() {
        this.clearGameListPaging();
        this.router.navigate(["/game"]);
    }

    public clearGameListPaging() {
        this.store.dispatch(new UpdateGamesListingFilterAction({ page: 1 }));
    }
}
