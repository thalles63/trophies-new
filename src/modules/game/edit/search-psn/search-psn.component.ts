import { Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ButtonComponent } from "../../../../components/button/button.component";
import { InputComponent } from "../../../../components/input/input.component";
import { AchievementsService } from "../../services/achievement.service";
import { GameService } from "../../services/game.service";

@Component({
    selector: "search-psn",
    imports: [ButtonComponent, InputComponent],
    templateUrl: "./search-psn.component.html",
    styleUrl: "./search-psn.component.scss",
    providers: [GameService, AchievementsService]
})
export class SearchGameInPsnComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly achievementsService = inject(AchievementsService);
    private readonly destroyRef = inject(DestroyRef);

    @Input() public gameId = "";
    protected gameUrl = "";
    protected isSaveLoading = false;

    public save() {
        this.isSaveLoading = true;

        this.achievementsService
            .saveFromPsn(this.gameUrl, this.gameId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result) => {
                    this.isSaveLoading = false;
                    this.activeModal.close(result);
                },
                error: () => {
                    this.isSaveLoading = false;
                }
            });
    }

    public cancel() {
        this.activeModal.close();
    }
}
