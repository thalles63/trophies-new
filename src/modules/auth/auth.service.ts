import { HttpClient, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { UserInfo } from "../../common/helpers/user-info";
import { UpdateIfUserIsLoggedInAction } from "../../common/store/core.action";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly store = inject(Store);
    private readonly router = inject(Router);
    private readonly activeModal = inject(NgbModal);

    private readonly API_URL = `${environment.API_URL}/auth`;

    public login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.API_URL}/login`, {
            email: username,
            password
        });
    }

    public addAuthHeader(request: HttpRequest<unknown>, accessToken: string | null) {
        const headers = { Authorization: `Bearer ${accessToken}` };

        return request.clone({
            setHeaders: headers
        });
    }

    public logout() {
        UserInfo.clearLoginToken();
        this.store.dispatch(new UpdateIfUserIsLoggedInAction(false));
        this.activeModal.dismissAll();
        this.router.navigate(["/"]);
    }
}
