import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
import { AuthService } from "../../modules/auth/auth.service";
import { NotificationService } from "../services/notification.service";
import { DecreaseBlockCountAction, IncreaseBlockCountAction } from "../store/loader.action";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private readonly notificationService = inject(NotificationService);
    private readonly authService = inject(AuthService);
    private readonly store = inject(Store);

    public intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Sent) {
                    this.store.dispatch(new IncreaseBlockCountAction());
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.notificationService.error("Token expired. Login again.");
                    this.authService.logout();
                } else {
                    this.notificationService.error("An error has ocurred");
                }

                return throwError(() => error);
            }),
            finalize(() => {
                this.store.dispatch(new DecreaseBlockCountAction());
            })
        );
    }
}
