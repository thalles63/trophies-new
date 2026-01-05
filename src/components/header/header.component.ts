import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router, RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { IconEnum } from "../../common/enums/icon.enum";
import { SortDirection } from "../../common/enums/sort-direction.enum";
import { StatusEnum } from "../../common/enums/status.enum";
import { UserInfo } from "../../common/helpers/user-info";
import { UpdateGamesListingFilterAction } from "../../common/store/core.action";
import { CoreState } from "../../common/store/core.state";
import { AuthService } from "../../modules/auth/auth.service";
import { LoginComponent } from "../../modules/auth/login/login.component";
import { GameFilter } from "../../modules/game/models/game-filter.interface";
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

    public goToBacklogSchedule() {
        this.router.navigate(["/backlog-schedule"]);
    }

    public syncItad() {
        this.router.navigate(["/syncItad"]);
    }

    public clearGameListPaging() {
        this.store.dispatch(
            new UpdateGamesListingFilterAction(<GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 10, status: StatusEnum.PlayingCompleted })
        );
    }

    public toggleOptions() {
        this.menuOpened = !this.menuOpened;
    }

    public openLoginModal() {
        this.modalService.open(LoginComponent, { centered: true, size: "md" });
    }

    public logout() {
        this.authService.logout();
    }
}
