import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AuthService } from "../../modules/auth/auth.service";
import { UserInfo } from "../helpers/user-info";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly authService = inject(AuthService);
    public intercept(request: HttpRequest<unknown>, next: HttpHandler) {
        const urlRequiredAuth = request.url.includes("/api");

        if (!urlRequiredAuth) {
            return next.handle(request);
        }

        request = this.authService.addAuthHeader(request, UserInfo.getToken());
        return next.handle(request);
    }
}
