import { GameSchedule } from "../../game/models/game-schedule.interface";
import { Game } from "../../game/models/game.interface";
import { Calendar } from "./calendar.interface";

export const CalendarData = <Calendar[]>[
    { id: 1, description: "January", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 2, description: "February", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 3, description: "March", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 4, description: "April", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 5, description: "May", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 6, description: "June", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 7, description: "July", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 8, description: "August", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 9, description: "September", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 10, description: "October", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 11, description: "November", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] },
    { id: 12, description: "December", completedGames: <Game[]>[], scheduledGames: <GameSchedule[]>[] }
];
