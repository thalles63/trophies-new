import { GameSchedule } from "../../game/models/game-schedule.interface";
import { Game } from "../../game/models/game.interface";
import { Calendar } from "./calendar.interface";

export const CalendarData = <Calendar[]>[
    { id: 1, description: "Janeiro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 2, description: "Fevereiro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 3, description: "Março", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 4, description: "Abril", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 5, description: "Maio", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 6, description: "Junho", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 7, description: "Julho", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 8, description: "Agosto", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 9, description: "Setembro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 10, description: "Outubro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 11, description: "Novembro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 12, description: "Dezembro", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] }
];
