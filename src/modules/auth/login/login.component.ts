import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { LoaderEnum } from "../../../common/enums/loader.enum";
import { UserInfo } from "../../../common/helpers/user-info";
import { NotificationService } from "../../../common/services/notification.service";
import { UpdateIfUserIsLoggedInAction } from "../../../common/store/core.action";
import { ButtonComponent } from "../../../components/button/button.component";
import { InputComponent } from "../../../components/input/input.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { LoaderService } from "../../../components/loader/loader.service";
import { AuthService } from "../auth.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    imports: [ButtonComponent, InputComponent, LoaderComponent],
    providers: [AuthService]
})
export class LoginComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly authService = inject(AuthService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);
    private readonly store = inject(Store);
    private readonly loaderService = inject(LoaderService);

    protected username = "";
    protected password = "";
    protected readonly loaderEnum = LoaderEnum;

    public cancel() {
        this.activeModal.close();
    }

    public login() {
        if (!this.username || !this.password) {
            this.notificationService.warning("Username or password invalid.");
            return;
        }

        this.authService
            .login(this.username, this.password)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.LOGIN))
            .subscribe({
                next: (result) => {
                    UserInfo.setLoginToken(result.token);
                    this.store.dispatch(new UpdateIfUserIsLoggedInAction(true));
                    this.activeModal.close();
                }
            });
    }
}
