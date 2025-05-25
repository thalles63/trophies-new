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
    dateCompleted: string;
    lastUnlock: string;
    isCampaignComplete: boolean;
    achievements: Achievement[];
    status: number;
    statusDescription: string;
    igdbId: string;
    isManualRegister: boolean;
    platformId?: string;
}
