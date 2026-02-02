import { TimePlayed } from "../edit/time-played/time-played.interface";
import { Achievement } from "./achievement.interface";

export interface Game {
    id: string;
    name: string;
    description: string;
    image: string;
    screenshots?: string[];
    banner: string;
    rating: number;
    platform: number;
    platformText?: string;
    timePlayed: TimePlayed;
    isPlatinumed: boolean;
    lastTimePlayed: string;
    lastTimePlayedFormatted: string;
    isCampaignComplete: boolean;
    achievements: Achievement[];
    status: number;
    statusDescription: string;
    isManualRegister: boolean;
    releaseDate: string;
    genres: string[];
    genresDescription: any[];
    themes: string[];
    themesDescription: any[];
    developer: string;
    publisher: string;
    completionistTime: number;
    mainExtrasTime: number;
    mainStoryTime: number;
    itadId: string;
    currentPrice: number;
    isPriceAllTimeLow: boolean;
    isPriceOneYearTimeLow: boolean;
    urlToBuy: string;
    comments: string;
}
