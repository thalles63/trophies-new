import { StatusEnum } from "../../common/enums/status.enum";
import { GameListSort } from "../../common/sorts/game-list.sort";

export const GameListSortBy = [
    { id: GameListSort.LastPlayed, description: "Últimos jogados" },
    { id: GameListSort.Name, description: "Nome" },
    { id: GameListSort.Rating, description: "Avaliação" }
];

export const GameListStatus = [
    { id: StatusEnum.PlayingCompleted, description: "Todos" },
    { id: StatusEnum.Playing, description: "Jogando" },
    { id: StatusEnum.Completed, description: "Completo" },
    { id: StatusEnum.Backlog, description: "Backlog" },
    { id: StatusEnum.Wishlist, description: "Wishlist" }
];
