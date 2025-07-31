import { Injectable } from "@angular/core";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { SanitizeEmptyStrings } from "../../../common/functions/functions";
import { GameStatusData, PlatformsData, RetroConsoleData } from "../edit/game-edit.data";
import { TimePlayed } from "../edit/time-played/time-played.interface";
import { Achievement } from "../models/achievement.interface";
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
            retroConsole: params.retroConsole,
            retroConsoleText: this.getRetroConsoleText(params.retroConsole),
            timePlayed: this.convertSecondsToTimePlayed(params.timePlayed),
            isPlatinumed: params.isPlatinumed,
            isCampaignComplete: params.isCampaignComplete,
            achievements: params.achievements.map(this.achievements).sortByField([
                { fieldName: "isAchieved", direction: SortDirection.Descending },
                { fieldName: "dateAchieved", direction: SortDirection.Ascending },
                { fieldName: "percentageAchieved", direction: SortDirection.Descending }
            ]),
            status: params.status,
            lastUnlock: params.lastUnlock,
            statusDescription: this.getStatusText(params.status),
            igdbId: params.igdbId,
            isManualRegister: params.isManualRegister,
            releaseDate: params.releaseDate,
            genres: params.genres.map((genre: any) => genre.slug),
            genresDescription: params.genres ?? [],
            themes: params.themes.map((theme: any) => theme.slug),
            themesDescription: params.themes ?? [],
            developer: params.developer,
            publisher: params.publisher
        };
    };

    public readonly achievements = (params: any): Achievement => {
        return {
            id: params.id,
            platformId: params.platformId,
            name: params.name,
            description: params.description,
            type: params.type,
            image: params.image,
            isAchieved: params.isAchieved,
            dateAchieved: params.dateAchieved,
            percentageAchieved: Number(params.percentageAchieved),
            index: crypto.randomUUID()
        };
    };
    public readonly dto = (params: Game) => {
        return SanitizeEmptyStrings({
            id: params.id,
            name: params.name,
            description: params.description,
            image: params.image,
            screenshot: params.screenshot,
            rating: params.rating,
            platform: params.platform,
            timePlayed: params.timePlayed ? this.convertTimePlayedToSeconds(params.timePlayed) : undefined,
            isPlatinumed: params.isPlatinumed,
            isCampaignComplete: params.isCampaignComplete,
            status: params.status,
            igdbId: params.igdbId,
            isManualRegister: params.isManualRegister,
            releaseDate: params.releaseDate,
            genres: params.genres,
            themes: params.themes,
            developer: params.developer,
            publisher: params.publisher
        });
    };

    public readonly achievementsDto = (params: Achievement) => {
        return {
            id: params.id,
            platformId: params.platformId,
            name: params.name,
            description: params.description,
            type: params.type,
            image: params.image,
            isAchieved: params.isAchieved,
            dateAchieved: params.dateAchieved,
            percentageAchieved: params.percentageAchieved
        };
    };

    private convertSecondsToTimePlayed(seconds: number): TimePlayed {
        const hours = Math.floor(seconds / (60 * 60));
        seconds %= 60 * 60;

        const minutes = Math.floor(seconds / 60);

        return {
            hours: hours,
            minutes: minutes
        };
    }

    private convertTimePlayedToSeconds(timePlayed: TimePlayed) {
        return Number(timePlayed.hours) * 3600 + Number(timePlayed.minutes) * 60;
    }

    public convertDateToFieldFormat(dateTime: string) {
        const date = new Date(dateTime);

        return new Intl.DateTimeFormat("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        })
            .format(date)
            .replace(",", "");
    }

    public convertDateToISOFormat(date: string) {
        const [datePart, timePart] = date.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hour, minute, second] = timePart.split(":").map(Number);

        const local = new Date(year, month - 1, day, hour, minute, second);

        return new Date(local.getTime()).toISOString();
    }

    private getPlatformText(platform: number): string {
        return PlatformsData.find((p) => p.id === platform)?.description ?? "";
    }

    private getStatusText(status: number): string {
        return GameStatusData.find((s) => s.id === status)?.description ?? "";
    }

    private getRetroConsoleText(console: number): string {
        return RetroConsoleData.find((p) => p.id === console)?.description ?? "";
    }
}
