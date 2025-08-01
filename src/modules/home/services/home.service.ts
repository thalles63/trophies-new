import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Game } from "../../game/models/game.interface";

@Injectable()
export class HomeService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/game`;

    public listGames(page: number, size: number, sort: number, status: number) {
        return this.http.get<{ games: Game[] }>(`${this.API_URL}`, {
            params: {
                page,
                limit: size,
                sort,
                status
            }
        });
    }

    public getGamesCountByStatus() {
        return this.http.get<any>(`${this.API_URL}/count`);
    }
}
