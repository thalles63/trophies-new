import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Game } from "../../game/models/game.interface";
import { BacklogScheduleMapper } from "../mappers/backlog-schedule.mapper";
import { BacklogSchedule } from "../models/backlog-schedule.interface";

@Injectable()
export class BacklogScheduleService {
    private readonly http = inject(HttpClient);
    private readonly backlogScheduleMapper = inject(BacklogScheduleMapper);

    private readonly API_URL = `${environment.API_URL}/backlogSchedule`;

    public listCompletedGames(year: number) {
        return this.http.get<{ games: Game[] }>(`${this.API_URL}/allCompleteFromYear?year=${year}`);
    }

    public listScheduledGames(year: number) {
        return this.http.get<{ games: Game[] }>(`${this.API_URL}/allScheduledFromYear?year=${year}`);
    }

    public listBacklogUnscheduledItems() {
        return this.http.get<Game[]>(`${this.API_URL}/backlogUnscheduledItems`);
    }

    public addSchedule(schedule: BacklogSchedule) {
        return this.http.post(`${this.API_URL}`, this.backlogScheduleMapper.dto(schedule));
    }

    public delete(scheduleId: string) {
        return this.http.delete(`${this.API_URL}/${scheduleId}`);
    }

    public getSchedule(scheduleId: string) {
        return this.http.get<BacklogSchedule>(`${this.API_URL}/${scheduleId}`);
    }
}
