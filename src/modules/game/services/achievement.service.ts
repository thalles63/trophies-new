import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";

@Injectable()
export class AchievementsService {
    private readonly http = inject(HttpClient);
    private readonly mapper = inject(GameMapper);

    private readonly API_URL = `${environment.API_URL}/achievements`;

    public saveAchievements(achievements: Achievement[], gameId: string) {
        return this.http.post(`${this.API_URL}/save-multiple`, { achievements: achievements.map(this.mapper.achievementsDto), gameId });
    }

    public deleteAchievements(achievements: Achievement[]) {
        return this.http.post(`${this.API_URL}/delete-multiple`, {
            ids: achievements.map((a) => a.id)
        });
    }

    public updateAchievements(achievements: Achievement[]) {
        return this.http.put(`${this.API_URL}/multiple`, achievements.map(this.mapper.achievementsDto));
    }
}
