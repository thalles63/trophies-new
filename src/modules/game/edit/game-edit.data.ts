import { PlatformEnum } from "../../../common/enums/platform.enum";
import { RetroConsoleEnum } from "../../../common/enums/retro-console.enum";
import { StatusEnum } from "../../../common/enums/status.enum";

export const PlatformsData = [
    {
        id: PlatformEnum.Pc,
        description: "Pc"
    },
    {
        id: PlatformEnum.Playstation5,
        description: "Playstation 5"
    },
    {
        id: PlatformEnum.Playstation4,
        description: "Playstation 4"
    },
    {
        id: PlatformEnum.Playstation3,
        description: "Playstation 3"
    },
    {
        id: PlatformEnum.Xbox,
        description: "Xbox"
    },
    {
        id: PlatformEnum.Steam,
        description: "Steam"
    },
    {
        id: PlatformEnum.RetroAchievements,
        description: "Retro Achievements"
    }
];

export const GameStatusData = [
    {
        id: StatusEnum.Playing,
        description: "Playing"
    },
    {
        id: StatusEnum.Completed,
        description: "Completed"
    },
    {
        id: StatusEnum.Shelved,
        description: "Shelved"
    },
    {
        id: StatusEnum.Backlog,
        description: "Backlog"
    },
    {
        id: StatusEnum.Wishlist,
        description: "Wishlist"
    }
];

export const TrueFalseData = [
    {
        id: true,
        description: "Yes"
    },
    {
        id: false,
        description: "No"
    }
];

export const RetroConsoleData = [
    {
        id: RetroConsoleEnum.Snes,
        description: "Super Nintendo"
    },
    {
        id: RetroConsoleEnum.Playstation,
        description: "Playstation"
    }
];
