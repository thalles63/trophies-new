import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { IconEnum } from "../../common/enums/icon.enum";
import { UserInfo } from "../../common/helpers/user-info";
import { UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { AuthService } from "../../modules/auth/auth.service";
import { LoginComponent } from "../../modules/auth/login/login.component";
import { ConfigComponent } from "../../modules/config/config.component";
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: "app-header",
    imports: [RouterLink, IconComponent],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss"
})
export class HeaderComponent implements OnInit {
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly elementRef = inject(ElementRef);
    private readonly modalService = inject(NgbModal);
    private readonly destroyRef = inject(DestroyRef);
    private readonly authService = inject(AuthService);

    protected screenshot = this.store.selectSignal(CoreState.backgroundScreenshot);
    protected menuOpened = false;
    protected icon = IconEnum;
    protected isUserLoggedIn = UserInfo.isLoggedIn();
    protected isLoggedInUser$ = this.store.select(CoreState.isLoggedInUser);

    @HostListener("document:click", ["$event"])
    public onClickOutside($event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains($event.target)) {
            this.menuOpened = false;
        }
    }

    public ngOnInit() {
        this.listenForUserLogin();
    }

    private listenForUserLogin() {
        this.isLoggedInUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoggedInUser) => {
            this.isUserLoggedIn = !!isLoggedInUser;
        });
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

    public logout() {
        this.authService.logout();
    }

    public openConfigModal() {
        this.modalService.open(ConfigComponent, { centered: true, size: "xl" });
    }
}
