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
    timePlayed: number;
    timePlayedConverted: string;
    isPlatinumed: boolean;
    dateCompleted: string;
    isCampaignComplete: boolean;
    achievements: Achievement[];
    status: number;
    statusDescription: string;
}
