import { Injectable } from "@angular/core";
import { SanitizeEmptyStrings } from "../../../common/functions/functions";
import { BacklogSchedule } from "../models/backlog-schedule.interface";

@Injectable({ providedIn: "root" })
export class BacklogScheduleMapper {
    public readonly dto = (params: BacklogSchedule) => {
        return SanitizeEmptyStrings({
            id: params.id,
            gameId: params.gameId,
            year: Number(params.year),
            month: Number(params.month),
            order: Number(params.order)
        });
    };
}
