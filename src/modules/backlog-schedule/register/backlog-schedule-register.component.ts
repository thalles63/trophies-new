import { DecimalPipe } from "@angular/common";
import { Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LoaderEnum } from "../../../common/enums/loader.enum";
import { ButtonComponent } from "../../../components/button/button.component";
import { InputComponent } from "../../../components/input/input.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { LoaderService } from "../../../components/loader/loader.service";
import { SelectComponent } from "../../../components/select/select.component";
import { Game } from "../../game/models/game.interface";
import { BacklogSchedule } from "../models/backlog-schedule.interface";
import { CalendarData } from "../models/calendar.data";
import { Calendar } from "../models/calendar.interface";
import { BacklogScheduleService } from "../service/backlog-schedule.service";

@Component({
    selector: "game",
    imports: [InputComponent, SelectComponent, ButtonComponent, DecimalPipe, LoaderComponent],
    templateUrl: "./backlog-schedule-register.component.html",
    styleUrl: "./backlog-schedule-register.component.scss",
    providers: [BacklogScheduleService]
})
export class BacklogScheduleRegisterComponent implements OnInit {
    private readonly service = inject(BacklogScheduleService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly activeModal = inject(NgbActiveModal);
    private readonly loaderService = inject(LoaderService);

    protected schedule = <BacklogSchedule>{};
    protected months = CalendarData;
    protected games = <Game[]>[];
    protected loaderEnum = LoaderEnum;

    @Input() allGames = <Calendar[]>[];
    @Input() scheduleId = "";

    public ngOnInit(): void {
        this.schedule.year = new Date().getFullYear();

        if (this.scheduleId) {
            this.getSchedule();
            return;
        }

        this.listGames();
    }

    private listGames() {
        this.service
            .listBacklogUnscheduledItems()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.games = result;

                if (this.scheduleId) {
                    this.games.push(<Game>{ id: this.schedule.gameId, name: this.schedule.game.name });
                }
            });
    }

    private getSchedule() {
        this.service
            .getSchedule(this.scheduleId)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.BACKLOG_SCHEDULE_FIND_BY_ID))
            .subscribe((result) => {
                this.schedule = result;

                this.listGames();
            });
    }

    protected isNewRegister() {
        return !this.schedule.id;
    }

    public determineNextOrder() {
        const monthGames = this.allGames[this.schedule.month - 1];
        this.schedule.order = monthGames.scheduledGames.length + 1;
    }

    protected confirmDelete() {
        this.service
            .delete(this.schedule.id)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.BACKLOG_SCHEDULE_DELETE))
            .subscribe(() => {
                this.activeModal.close(true);
            });
    }

    protected cancel() {
        this.activeModal.close(false);
    }

    protected save() {
        this.service
            .addSchedule(this.schedule)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.BACKLOG_SCHEDULE_ADD))
            .subscribe(() => {
                this.activeModal.close(true);
            });
    }
}
