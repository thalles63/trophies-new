import { StatusEnum } from "../../common/enums/status.enum";
import { GameListSort } from "../../common/sorts/game-list.sort";

export const GameListSortBy = [
    { id: GameListSort.LastPlayed, description: "Last Played" },
    { id: GameListSort.Name, description: "Name" },
    { id: GameListSort.Rating, description: "Rating" }
];

export const GameListStatus = [
    { id: StatusEnum.PlayingCompleted, description: "All Games" },
    { id: StatusEnum.Playing, description: "Playing" },
    { id: StatusEnum.Completed, description: "Completed" },
    { id: StatusEnum.Backlog, description: "Backlog" },
    { id: StatusEnum.Wishlist, description: "Wishlist" }
];
