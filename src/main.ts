/// <reference types="@angular/localize" />

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./core/app.component";
import { appConfig } from "./core/app.config";

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
