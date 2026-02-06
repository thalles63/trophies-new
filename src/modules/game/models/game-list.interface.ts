import { TimePlayed } from "../edit/time-played/time-played.interface";

export interface GameList {
    id: string;
    name: string;
    image: string;
    homeCoverType: number;
    imageSteam: string;
    imageRawg: string;
    rating: number;
    platform: number;
    platformText?: string;
    timePlayed: TimePlayed;
    lastTimePlayed: string;
    status: number;
    statusDescription: string;
    itadId: string;
    currentPrice: number;
    regularPrice: number;
    isPriceAllTimeLow: boolean;
    isPriceOneYearTimeLow: boolean;
    urlToBuy: string;
    achievements: number;
    earnedAchievements: number;
}
