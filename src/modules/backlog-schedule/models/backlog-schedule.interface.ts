import { Game } from "../../game/models/game.interface";

export interface BacklogSchedule {
    id: string;
    gameId: string;
    year: number;
    month: number;
    order: number;
    game: Game;
}
