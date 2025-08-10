import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SanitizeEmptyStrings } from "../../../common/functions/functions";
import { environment } from "../../../environments/environment";
import { GameFilter } from "../../game/models/game-filter.interface";
import { Game } from "../../game/models/game.interface";

@Injectable()
export class HomeService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/game`;

    public listGames(filters: GameFilter) {
        return this.http.post<{ games: Game[] }>(`${this.API_URL}/list`, SanitizeEmptyStrings(filters));
    }

    public getGamesCountByStatus(filters: GameFilter) {
        return this.http.post<any>(`${this.API_URL}/count`, SanitizeEmptyStrings(filters));
    }
}
