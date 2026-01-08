import { TimePlayed } from "../../game/edit/time-played/time-played.interface";
import { GameSchedule } from "../../game/models/game-schedule.interface";
import { Game } from "../../game/models/game.interface";

export interface Calendar {
    id: number;
    description: string;
    completedGames: Game[];
    scheduledGames: GameSchedule[];
    totalTime?: TimePlayed;
}
