import { Component, inject, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "microsoft-code",
    templateUrl: "./microsoft-code.component.html",
    imports: [ButtonComponent]
})
export class MicrosoftCodeComponent {
    private readonly activeModal = inject(NgbActiveModal);

    @Input() public code = "";
    @Input() public url = "";

    close() {
        this.activeModal.close();
    }
}
