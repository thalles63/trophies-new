import { PlatformEnum } from "../../../common/enums/platform.enum";
import { StatusEnum } from "../../../common/enums/status.enum";

export const PlatformsData = [
    {
        id: PlatformEnum.Epic,
        description: "Epic"
    },
    {
        id: PlatformEnum.Gog,
        description: "Gog"
    },
    {
        id: PlatformEnum.Pc,
        description: "Pc"
    },
    {
        id: PlatformEnum.Playstation1,
        description: "Playstation"
    },
    {
        id: PlatformEnum.Playstation2,
        description: "Playstation 2"
    },
    {
        id: PlatformEnum.Playstation3,
        description: "Playstation 3"
    },
    {
        id: PlatformEnum.Playstation4,
        description: "Playstation 4"
    },
    {
        id: PlatformEnum.Playstation5,
        description: "Playstation 5"
    },
    {
        id: PlatformEnum.Snes,
        description: "Super Nintendo"
    },
    {
        id: PlatformEnum.Steam,
        description: "Steam"
    },
    {
        id: PlatformEnum.Switch,
        description: "Switch"
    },
    {
        id: PlatformEnum.Xbox,
        description: "Xbox"
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
