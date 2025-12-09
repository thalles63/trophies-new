import { TimePlayed } from "../../game/edit/time-played/time-played.interface";
import { Game } from "../../game/models/game.interface";

export interface Calendar {
    id: number;
    description: string;
    completedGames: Game[];
    scheduledGames: Game[];
    totalTime?: TimePlayed;
}
