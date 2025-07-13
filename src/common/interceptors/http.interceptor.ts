import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../../modules/auth/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private readonly notificationService = inject(NotificationService);
    private readonly authService = inject(AuthService);

    public intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.notificationService.error("Token expired. Login again.");
                    this.authService.logout();
                } else {
                    this.notificationService.error("An error has ocurred");
                }

                return throwError(() => error);
            })
        );
    }
}
