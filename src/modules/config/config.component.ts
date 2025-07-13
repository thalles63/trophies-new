import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NotificationService } from "../../common/services/notification.service";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { Configuration } from "./config.interface";
import { ConfigService } from "./config.service";

@Component({
    selector: "config",
    templateUrl: "./config.component.html",
    imports: [ButtonComponent, InputComponent],
    providers: [ConfigService],
    styleUrl: "./config.component.scss"
})
export class ConfigComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly configService = inject(ConfigService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly notificationService = inject(NotificationService);

    protected isLoginLoading = false;
    protected configs = <Configuration[]>[];
    protected npsso = "";

    public cancel() {
        this.activeModal.close();
    }

    public save() {
        if (!this.npsso) {
            this.notificationService.error("Invalid NPSSO");
            return;
        }

        this.createConfigsArray();
        this.isLoginLoading = true;

        this.configService
            .save(this.configs)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.isLoginLoading = false;
                    this.activeModal.close();
                },
                error: () => {
                    this.isLoginLoading = false;
                }
            });
    }

    private createConfigsArray() {
        this.configs = [];

        this.configs.push({ key: "npsso", value: this.npsso });
    }
}
