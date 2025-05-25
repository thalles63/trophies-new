import { Component, ElementRef, HostListener, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { IconEnum } from "../../common/enums/icon.enum";
import { UserInfo } from "../../common/helpers/user-info";
import { UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { LoginComponent } from "../../modules/auth/login/login.component";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: "app-header",
    imports: [RouterLink, IconComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly elementRef = inject(ElementRef);
    private readonly modalService = inject(NgbModal);

    protected screenshot = this.store.selectSignal(CoreState.backgroundScreenshot);
    protected menuOpened = false;
    protected icon = IconEnum;
    protected isUserLoggedIn = UserInfo.isLoggedIn();

    @HostListener("document:click", ["$event"])
    public onClickOutside($event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains($event.target)) {
            this.menuOpened = false;
        }
    }

    public addGame() {
        this.router.navigate(["/game"]);
    }

    public clearGameListPaging() {
        this.store.dispatch(new UpdateGamesListingFilterAction({ page: 1, sort: 2, status: 5 }));
    }

    public toggleOptions() {
        this.menuOpened = !this.menuOpened;
    }

    public syncPlaystation() {
        this.router.navigate(["/sync/playstation"]);
    }

    public syncXbox() {
        this.router.navigate(["/sync/xbox"]);
    }

    public syncSteam() {
        this.router.navigate(["/sync/steam"]);
    }

    public openLoginModal() {
        this.modalService.open(LoginComponent, { centered: true, size: "md" });
    }
}
