import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";

@Injectable()
export class AchievementsService {
    private readonly http = inject(HttpClient);
    private readonly mapper = inject(GameMapper);

    private readonly API_URL = `${environment.API_URL}/games`;
    private readonly API_ACHIEVEMENTS_URL = `achievements`;

    public deleteAchievement(achievement: Achievement, gameId: string) {
        return this.http.delete(`${this.API_URL}/${gameId}/${this.API_ACHIEVEMENTS_URL}/${achievement.id}`);
    }

    public edit(achievement: Achievement, gameId: string) {
        return this.http.put(`${this.API_URL}/${gameId}/${this.API_ACHIEVEMENTS_URL}/${achievement.id}`, this.mapper.achievementsDto(achievement));
    }

    public saveFromSteam(selectedGameId: string, gameId: string) {
        return this.http.post<Achievement[]>(`${this.API_URL}/${gameId}/${this.API_ACHIEVEMENTS_URL}/saveFromSteam`, {
            platformId: selectedGameId
        });
    }

    public saveFromPsn(gameUrl: string, gameId: string) {
        return this.http.post<Achievement[]>(`${this.API_URL}/${gameId}/${this.API_ACHIEVEMENTS_URL}/saveFromPsnProfiles`, { gameUrl });
    }

    public saveFromRetroAchievements(selectedGameId: string, gameId: string) {
        return this.http.post<Achievement[]>(`${this.API_URL}/${gameId}/${this.API_ACHIEVEMENTS_URL}/saveFromRetroAchievements`, {
            platformId: selectedGameId
        });
    }
}
