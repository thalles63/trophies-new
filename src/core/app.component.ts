import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { HeaderComponent } from "../components/header/header.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent {
    private readonly translate = inject(TranslateService);

    constructor() {
        this.translate.addLangs(["pt"]);
        this.translate.setFallbackLang("pt");
        this.translate.use("pt");
    }
}
