import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { UserInfo } from "../../../common/helpers/user-info";
import { NotificationService } from "../../../common/services/notification.service";
import { UpdateIfUserIsLoggedInAction } from "../../../common/store/core.action";
import { ButtonComponent } from "../../../components/button/button.component";
import { InputComponent } from "../../../components/input/input.component";
import { AuthService } from "../auth.service";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    imports: [ButtonComponent, InputComponent],
    providers: [AuthService]
})
export class LoginComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly authService = inject(AuthService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);
    private readonly store = inject(Store);

    protected isLoginLoading = false;
    protected username = "";
    protected password = "";

    public cancel() {
        this.activeModal.close();
    }

    public login() {
        if (!this.username || !this.password) {
            this.notificationService.error("Username or password invalid.");
            return;
        }

        this.isLoginLoading = true;

        this.authService
            .login(this.username, this.password)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.isLoginLoading = false;
                    UserInfo.setLoginToken(result.token);
                    this.store.dispatch(new UpdateIfUserIsLoggedInAction(true));
                    this.activeModal.close();
                },
                error: () => {
                    this.isLoginLoading = false;
                }
            });
    }
}
