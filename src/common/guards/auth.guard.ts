import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserInfo } from "../helpers/user-info";

export const AuthGuard = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);

    if (!UserInfo.isLoggedIn()) {
        router.navigate(["/"]);
        return false;
    }

    return true;
};
