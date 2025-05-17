import { Injectable } from "@angular/core";
import { Game } from "../models/game.interface";

@Injectable({ providedIn: "root" })
export class GameMapper {
    public readonly findById = (params: any): Game => {
        return {
            id: params.id,
            name: params.name,
            description: params.description,
            image: params.image,
            screenshot: params.screenshot,
            rating: params.rating,
            platform: params.platform,
            platformText: this.getPlatformText(params.platform),
            timePlayed: params.timePlayed,
            timePlayedConverted: this.getConvertedTime(params.timePlayed),
            isPlatinumed: params.isPlatinumed,
            dateCompleted: params.dateCompleted,
            isCampaignComplete: params.isPlatinumed,
            achievements: params.achievements,
            status: params.status,
            statusDescription: this.getStatusText(params.status)
        };
    };

    private getConvertedTime(seconds: number) {
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;

        const minutes = Math.floor(seconds / 60);

        return `${hours} hours and ${minutes} minutes`;
    }

    private getPlatformText(platform: number): string {
        const platforms: any = {
            1: "Pc",
            2: "Playstation 5",
            3: "Playstation 4",
            4: "Xbox",
            5: "Steam"
        };

        return platforms[platform];
    }

    private getStatusText(status: number): string {
        const statuses: any = {
            1: "Playing",
            2: "Complete",
            3: "Shelved",
            4: "Backlog"
        };

        return statuses[status];
    }
}
