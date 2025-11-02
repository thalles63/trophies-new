import { TimePlayed } from "../edit/time-played/time-played.interface";
import { Achievement } from "./achievement.interface";

export interface Game {
    id: string;
    name: string;
    description: string;
    image: string;
    screenshot: string;
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
    platformId?: string;
    retroConsole: number;
    retroConsoleText?: string;
    releaseDate: string;
    igdbId?: string;
    genres: string[];
    genresDescription: any[];
    themes: string[];
    themesDescription: any[];
    developer: string;
    publisher: string;
}
