import { AfterViewInit, Component, DestroyRef, inject, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngxs/store";
import { LoaderEnum } from "../../../common/enums/loader.enum";
import { UserInfo } from "../../../common/helpers/user-info";
import { UpdateBackgroundScreenshotAction } from "../../../common/store/core.action";
import { ButtonComponent } from "../../../components/button/button.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { LoaderService } from "../../../components/loader/loader.service";
import { GameMapper } from "../../game/mappers/game.mapper";
import { CalendarData } from "../models/calendar.data";
import { BacklogScheduleRegisterComponent } from "../register/backlog-schedule-register.component";
import { BacklogScheduleService } from "../service/backlog-schedule.service";

@Component({
    selector: "backlog-schedule",
    templateUrl: "./backlog-schedule.component.html",
    styleUrl: "./backlog-schedule.component.scss",
    providers: [BacklogScheduleService],
    imports: [RouterLink, ButtonComponent, LoaderComponent]
})
export class BacklogScheduleComponent implements AfterViewInit, OnInit {
    private readonly service = inject(BacklogScheduleService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly titleService = inject(Title);
    private readonly store = inject(Store);
    private readonly modalService = inject(NgbModal);
    private readonly mapper = inject(GameMapper);
    private readonly loaderService = inject(LoaderService);

    protected months = structuredClone(CalendarData);
    protected isUserLoggedIn = UserInfo.isLoggedIn();
    protected year = new Date().getFullYear();
    protected loaderEnum = LoaderEnum;

    public ngOnInit(): void {
        this.store.dispatch(new UpdateBackgroundScreenshotAction(undefined));
        this.titleService.setTitle("Backlog Schedule");
    }

    public ngAfterViewInit(): void {
        this.listPlayedGames();
    }

    protected listPlayedGames() {
        this.months = structuredClone(CalendarData);

        this.service
            .listCompletedGames(this.year)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.BACKLOG_SCHEDULE_LIST_PLAYED))
            .subscribe((games: any) => {
                for (const month of this.months) {
                    month.completedGames = games.sortByField({ fieldName: "lastTimePlayed" }).filter((game: any) => game.month === month.id);
                }

                this.listScheduledGames();
            });
    }

    protected listScheduledGames() {
        this.service
            .listScheduledGames(this.year)
            .pipe(takeUntilDestroyed(this.destroyRef), this.loaderService.watch(LoaderEnum.BACKLOG_SCHEDULE_LIST_SCHEDULED))
            .subscribe((games: any) => {
                for (const month of this.months) {
                    month.scheduledGames = games.sortByField({ fieldName: "order" }).filter((game: any) => game.month === month.id);

                    const totalTime = month.completedGames.reduce((accumulator: number, game: any) => {
                        return accumulator + game.timePlayed;
                    }, 0);

                    const scheduledTotalTime = month.scheduledGames.reduce((accumulator: number, game: any) => {
                        return accumulator + (game.mainStoryTime || 0);
                    }, 0);

                    month.totalTime = this.mapper.convertSecondsToTimePlayed(totalTime + scheduledTotalTime);
                }
            });
    }

    protected minusYear() {
        this.year--;
        this.listPlayedGames();
    }

    protected plusYear() {
        if (this.year >= new Date().getFullYear() + 1) {
            return;
        }

        this.year++;
        this.listPlayedGames();
    }

    protected openModal(scheduleId?: string) {
        const modalRef = this.modalService.open(BacklogScheduleRegisterComponent, { centered: true, size: "lg" });
        modalRef.componentInstance.allGames = this.months;
        modalRef.componentInstance.scheduleId = scheduleId;

        modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
            if (!result) {
                return;
            }

            this.listPlayedGames();
        });
    }
}
