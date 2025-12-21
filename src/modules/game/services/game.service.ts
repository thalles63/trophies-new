import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SanitizeEmptyStrings } from "../../../common/functions/functions";
import { environment } from "../../../environments/environment";
import { GameMapper } from "../mappers/game.mapper";
import { GameFilter } from "../models/game-filter.interface";
import { Game } from "../models/game.interface";
import { Genre } from "../models/genre.interface";
import { Theme } from "../models/theme.interface";

@Injectable()
export class GameService {
    private readonly http = inject(HttpClient);
    private readonly mapper = inject(GameMapper);

    private readonly API_URL = `${environment.API_URL}/games`;

    public listGames(filters: GameFilter) {
        return this.http.post<{ games: Game[] }>(`${this.API_URL}/list`, SanitizeEmptyStrings(filters));
    }

    public getGamesCountByStatus(filters: GameFilter) {
        return this.http.post<any>(`${this.API_URL}/count`, SanitizeEmptyStrings(filters));
    }

    public getById(gameId: string) {
        return this.http.get<Game>(`${this.API_URL}/${gameId}`);
    }

    public save(game: Game) {
        return this.http.post<Game>(`${this.API_URL}`, this.mapper.dto(game));
    }

    public update(game: Game) {
        return this.http.put<Game>(`${this.API_URL}/${game.id}`, this.mapper.dto(game));
    }

    public searchIgdb(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/searchIgdb?gameName=${gameName}`);
    }

    public searchHltb(gameName: string) {
        return this.http.get<any>(`${environment.HLTB_MS_URL}/search?name=${gameName}`);
    }

    public searchItad(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/searchItad?gameName=${gameName}`);
    }

    public searchSteam(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/searchSteam?gameName=${gameName}`);
    }

    public searchPsnProfiles(gameName: string) {
        return this.http.get<any>(`${this.API_URL}/searchPsnProfiles?gameName=${gameName}`);
    }

    public searchRetroAchievements(gameName: string, platform: number) {
        return this.http.get<any>(`${this.API_URL}/searchRetroAchievements?gameName=${gameName}&platform=${platform}`);
    }

    public delete(gameId: string) {
        return this.http.delete<void>(`${this.API_URL}/${gameId}`);
    }

    public listGenres() {
        return this.http.get<Genre[]>(`${this.API_URL}/genres`);
    }

    public listThemes() {
        return this.http.get<Theme[]>(`${this.API_URL}/themes`);
    }

    public syncItad() {
        return this.http.post<void>(`${this.API_URL}/syncItad`, {});
    }
}
