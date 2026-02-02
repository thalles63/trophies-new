import { Component, DestroyRef, inject, Input } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslatePipe } from "@ngx-translate/core";
import { LoaderEnum } from "../../../../common/enums/loader.enum";
import { PlatformEnum } from "../../../../common/enums/platform.enum";
import { ButtonComponent } from "../../../../components/button/button.component";
import { InputComponent } from "../../../../components/input/input.component";
import { LoaderComponent } from "../../../../components/loader/loader.component";
import { LoaderService } from "../../../../components/loader/loader.service";
import { SelectComponent } from "../../../../components/select/select.component";
import { GameMapper } from "../../mappers/game.mapper";
import { Achievement } from "../../models/achievement.interface";
import { TrueFalseData } from "../../models/game-edit.data";
import { Game } from "../../models/game.interface";
import { AchievementsService } from "../../services/achievement.service";
import { AchievementTypeData } from "./achievement-edit.data";

@Component({
    selector: "game-edit",
    imports: [InputComponent, SelectComponent, ButtonComponent, LoaderComponent, TranslatePipe],
    templateUrl: "./achievement-edit.component.html",
    styleUrl: "./achievement-edit.component.scss",
    providers: [AchievementsService]
})
export class AchievementEditComponent {
    private readonly activeModal = inject(NgbActiveModal);
    private readonly achievementsService = inject(AchievementsService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly mapper = inject(GameMapper);
    private readonly loaderService = inject(LoaderService);

    @Input() public achievement = <Achievement>{};
    @Input() public game = <Game>{};
    protected trueFalse = TrueFalseData;
    protected achievementTypes = AchievementTypeData;
    protected platformEnum = PlatformEnum;
    protected loaderEnum = LoaderEnum;

    public save() {
        if (this.achievement.dateAchievedConverted) {
            this.achievement.dateAchieved = this.mapper.convertDateToISOFormat(this.achievement.dateAchievedConverted);
        }

        this.achievementsService
            .edit(this.achievement, this.game.id)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.ACHIEVEMENT_SAVE))
            .subscribe(() => {
                this.activeModal.close(this.achievement);
            });
    }

    public cancel() {
        this.activeModal.close();
    }
}
