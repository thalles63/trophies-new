import { Injectable } from "@angular/core";
import { SortDirection } from "../../../common/enums/sort-direction.enum";
import { SanitizeEmptyStrings } from "../../../common/functions/functions";
import { TimePlayed } from "../edit/time-played/time-played.interface";
import { Achievement } from "../models/achievement.interface";
import { GameStatusData, PlatformsData } from "../models/game-edit.data";
import { GameFromOnline } from "../models/game-from-online.interface";
import { GameList } from "../models/game-list.interface";
import { Game } from "../models/game.interface";

@Injectable({ providedIn: "root" })
export class GameMapper {
    public readonly list = (params: any): GameList => {
        return {
            id: params.id,
            name: params.name,
            image: params.image,
            rating: Number(params.rating),
            platform: params.platform,
            platformText: this.getPlatformText(params.platform),
            timePlayed: this.convertSecondsToTimePlayed(params.timePlayed),
            status: params.status,
            lastTimePlayed: params.lastTimePlayed,
            statusDescription: this.getStatusText(params.status),
            currentPrice: params.currentPrice,
            regularPrice: params.regularPrice,
            isPriceAllTimeLow: params.isPriceAllTimeLow,
            isPriceOneYearTimeLow: params.isPriceOneYearTimeLow,
            itadId: params.itadId,
            urlToBuy: params.urlToBuy,
            earnedAchievements: params.earnedAchievements,
            achievements: params.achievements
        };
    };

    public readonly findById = (params: any): Game => {
        return {
            id: params.id,
            name: params.name,
            description: params.description,
            image: params.image,
            screenshots: params.screenshots?.map((s: string) => s.replace("t_1080p_2x", "t_screenshot_med")),
            banner: params.banner,
            rating: Number(params.rating),
            platform: params.platform,
            platformText: this.getPlatformText(params.platform),
            timePlayed: this.convertSecondsToTimePlayed(params.timePlayed),
            isPlatinumed: params.isPlatinumed,
            isCampaignComplete: params.isCampaignComplete,
            achievements: params.achievements?.map(this.achievements).sortByField([
                { fieldName: "isAchieved", direction: SortDirection.Descending },
                { fieldName: "dateAchieved", direction: SortDirection.Ascending },
                { fieldName: "percentageAchieved", direction: SortDirection.Descending }
            ]),
            status: params.status,
            lastTimePlayed: params.lastTimePlayed,
            lastTimePlayedFormatted: this.convertDateToFieldFormat(params.lastTimePlayed),
            statusDescription: this.getStatusText(params.status),
            isManualRegister: params.isManualRegister,
            releaseDate: params.releaseDate,
            genres: params.genres?.map((genre: any) => genre.slug),
            genresDescription: params.genres ?? [],
            themes: params.themes?.map((theme: any) => theme.slug),
            themesDescription: params.themes ?? [],
            developer: params.developer,
            publisher: params.publisher,
            completionistTime: params.completionistTime,
            mainExtrasTime: params.mainExtrasTime,
            mainStoryTime: params.mainStoryTime,
            currentPrice: params.currentPrice,
            isPriceAllTimeLow: params.isPriceAllTimeLow,
            isPriceOneYearTimeLow: params.isPriceOneYearTimeLow,
            itadId: params.itadId,
            urlToBuy: params.urlToBuy
        };
    };

    public readonly getInIgdb = (params: GameFromOnline) => {
        return <Game>{
            name: params.name,
            description: params.description,
            image: params.image,
            screenshots: params.screenshots,
            banner: params.banner,
            releaseDate: params.releaseDate,
            genres: params.genres,
            themes: params.themes,
            developer: params.developer,
            publisher: params.publisher
        };
    };

    public readonly getInHltb = (params: GameFromOnline) => {
        return <Game>{
            completionistTime: params.times.completionist,
            mainExtrasTime: params.times.mainExtras,
            mainStoryTime: params.times.mainStory
        };
    };

    public readonly getInItad = (params: GameFromOnline) => {
        return <Game>{
            itadId: params.id
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
            screenshots: params.screenshots?.map((s: string) => s.replace("t_screenshot_med", "t_1080p_2x")),
            banner: params.banner,
            rating: params.rating,
            platform: params.platform,
            timePlayed: params.timePlayed ? this.convertTimePlayedToSeconds(params.timePlayed) : undefined,
            isPlatinumed: params.isPlatinumed,
            isCampaignComplete: params.isCampaignComplete,
            status: params.status,
            lastTimePlayed: this.convertDateToISOFormat(params.lastTimePlayedFormatted),
            isManualRegister: params.isManualRegister,
            releaseDate: params.releaseDate,
            genres: params.genres,
            themes: params.themes,
            developer: params.developer,
            publisher: params.publisher,
            completionistTime: params.completionistTime,
            mainExtrasTime: params.mainExtrasTime,
            mainStoryTime: params.mainStoryTime,
            currentPrice: params.currentPrice,
            isPriceAllTimeLow: params.isPriceAllTimeLow,
            isPriceOneYearTimeLow: params.isPriceOneYearTimeLow,
            itadId: params.itadId,
            urlToBuy: params.urlToBuy
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

    public convertSecondsToTimePlayed(seconds: number): TimePlayed {
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
        if (!dateTime) {
            return "";
        }

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
        if (!date) {
            return "";
        }

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
}
