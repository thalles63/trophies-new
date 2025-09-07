import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "../components/header/header.component";
import { MicrosoftCodeComponent } from "../components/microsoft-code/microsoft-code.component";
import { environment } from "../environments/environment";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss"
})
export class AppComponent implements OnInit {
    private readonly modalService = inject(NgbModal);

    public ngOnInit() {
        this.connectWs();
    }

    private connectWs() {
        const ws = new WebSocket(environment.WS_URL + "/xbox");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "code") {
                this.openMicrosoftCodeModal(data.userCode, data.verificationUri);
            }

            if (data.type === "authenticated") {
                console.log("Usuário autenticou! Token:", data.accessToken);
            }

            if (data.type === "error") {
                console.error("Erro:", data.message);
            }
        };
    }

    public openMicrosoftCodeModal(code: string, url: string) {
        const modalRef = this.modalService.open(MicrosoftCodeComponent, { centered: true, size: "xl" });
        modalRef.componentInstance.code = code;
        modalRef.componentInstance.url = url;
    }
}
