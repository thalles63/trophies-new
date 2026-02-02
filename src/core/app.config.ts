import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideStore } from "@ngxs/store";
import "../common/helpers/array-extensions";
import { AuthInterceptor } from "../common/interceptors/auth.interceptor";
import { AppHttpInterceptor } from "../common/interceptors/http.interceptor";
import { CoreState } from "../common/store/core.state";
import { routes } from "../modules/app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideStore([CoreState]),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: "/utils/i18n/",
                suffix: ".json"
            }),
            fallbackLang: "pt",
            lang: "pt"
        }),
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
