import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideStore } from "@ngxs/store";
import "../common/helpers/array-extensions";
import { AuthInterceptor } from "../common/interceptors/auth.interceptor";
import { AppHttpInterceptor } from "../common/interceptors/http.interceptor";
import { CoreState } from "../common/store/core.state";
import { LoaderState } from "../common/store/loader.state";
import { routes } from "../modules/app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore([CoreState, LoaderState]),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppHttpInterceptor,
            multi: true
        }
    ]
};
