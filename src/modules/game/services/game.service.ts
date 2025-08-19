import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { GameMapper } from "../mappers/game.mapper";
import { Game } from "../models/game.interface";

@Injectable()
export class GameService {
    private readonly http = inject(HttpClient);
    private readonly mapper = inject(GameMapper);

    private readonly API_URL = `${environment.API_URL}/game`;

    public getById(gameId: string) {
        return this.http.get<Game>(`${this.API_URL}/${gameId}`);
    }

    public save(game: Game) {
        return this.http.post<Game>(`${this.API_URL}`, this.mapper.dto(game));
    }

    public update(game: Game) {
        return this.http.put<Game>(`${this.API_URL}/${game.id}`, { game: this.mapper.dto(game) });
    }

    public searchIgdb(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/search-igdb?gameName=${gameName}`);
    }

    public searchSteam(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/search-steam?gameName=${gameName}`);
    }

    public delete(gameId: string) {
        return this.http.delete<void>(`${this.API_URL}/${gameId}`);
    }

    public createNewGameWithIgdbInfo(game: Game) {
        return this.http.post<Game>(`${this.API_URL}/create-game-with-igdb-info`, { game: this.mapper.dto(game) });
    }

    public updateGameWithIgdbInfo(game: Game, gameId: string) {
        return this.http.put<Game>(`${this.API_URL}/update-igdb-info/${gameId}`, { game: this.mapper.dto(game) });
    }
}
