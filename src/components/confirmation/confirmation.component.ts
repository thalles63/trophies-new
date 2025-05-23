import { Component, inject, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "confirmation",
    templateUrl: "./confirmation.component.html",
    imports: [ButtonComponent]
})
export class ConfirmationComponent {
    private readonly activeModal = inject(NgbActiveModal);

    @Input() public title = "";
    @Input() public body = "";

    public confirm() {
        this.activeModal.close(true);
    }

    public cancel() {
        this.activeModal.close(false);
    }
}
