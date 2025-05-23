import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotificationService } from "../services/notification.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private readonly notificationService = inject(NotificationService);

    public intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.notificationService.error("An error has ocurred");

                return throwError(() => error);
            })
        );
    }
}
