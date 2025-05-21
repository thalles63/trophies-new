import { PlatformEnum } from "../../../common/enums/platform.enum";
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
        id: PlatformEnum.Xbox,
        description: "Xbox"
    },
    {
        id: PlatformEnum.Steam,
        description: "Steam"
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
