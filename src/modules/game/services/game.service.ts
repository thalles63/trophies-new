import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "../../../environments/environment";
import { GameMapper } from "../mappers/game.mapper";
import { Achievement } from "../models/achievement.interface";
import { Game } from "../models/game.interface";

@Injectable()
export class GameService {
    private readonly http = inject(HttpClient);
    private readonly mapper = inject(GameMapper);

    private readonly API_URL = `${environment.API_URL}/game`;

    // public getById(gameId: string) {
    //     return this.http.get<Game>(`${this.API_URL}/${gameId}`);
    // }

    public update(game: Game) {
        return this.http.put<Game>(`${this.API_URL}/${game.id}`, { game: this.mapper.findByIdDto(game) });
    }

    public deleteAchievements(achievements: Achievement[]) {
        return this.http.post(`${this.API_URL}/achievements/delete-multiple`, {
            ids: achievements.map((a) => a.id)
        });
    }

    public updateAchievements(achievements: Achievement[]) {
        return this.http.put(`${this.API_URL}/achievements/multiple`, achievements.map(this.mapper.achievementsDto));
    }

    public getById(gameId: string) {
        return of({
            id: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39",
            igdbId: "",
            platformId: "2002870555",
            name: "A Little to the Left",
            description: null,
            image: "",
            status: 1,
            platform: 4,
            timePlayed: 0,
            isPlatinumed: false,
            dateCompleted: null,
            isCampaignComplete: false,
            screenshot: "",
            rating: "0.00",
            lastUnlock: "2024-08-01T00:39:24.197Z",
            deletedAt: null,
            createdAt: "2025-05-16T17:39:44.476Z",
            updatedAt: "2025-05-16T19:21:06.044Z",
            achievements: [
                {
                    id: "8553784e-bc55-4413-bfd7-c12b20d41400",
                    platformId: "1",
                    name: "Home Sweet Home",
                    description: "Complete Chapter 1",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "d9959675-bbe5-4d2b-ab9c-9faccd5fd21f",
                    platformId: "2",
                    name: "Lost Recipe",
                    description: "Complete Chapter 2",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "a8957dcf-1aa6-4602-b8fc-435af3c3fc08",
                    platformId: "3",
                    name: "Nitty Gritty",
                    description: "Complete Chapter 3",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "f6a1c89e-9c69-4031-9fa0-63ee74c858b3",
                    platformId: "4",
                    name: "Inner Nature",
                    description: "Complete Chapter 4",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "f7fb0171-9fe4-4c3f-9f10-5e0f59a56ad2",
                    platformId: "5",
                    name: "Near Earth Organizer",
                    description: "Complete Chapter 5",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "c0887e68-829e-44c8-b55d-732c9b595715",
                    platformId: "6",
                    name: "A Cozy Completion",
                    description: "Complete the campaign",
                    type: "50",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6a8faa37-b1ce-4fa6-a37f-bf109485f992",
                    platformId: "7",
                    name: "Guests Coming Over",
                    description: "Chapter 1 100% Completion",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "b491f86d-1812-4a59-87e2-c3a8b025316a",
                    platformId: "8",
                    name: "Clean Kitchen",
                    description: "Chapter 2 100% Completion",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "add7f7af-4429-44ad-9d8c-d362ed9e613b",
                    platformId: "9",
                    name: "Spring Cleaning",
                    description: "Chapter 3 100% Completion",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "06cdcfd8-b572-4a0d-9c8d-0e13f3cb87d7",
                    platformId: "10",
                    name: "One With Nature",
                    description: "Chapter 4 100% Completion",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6a67cff6-de25-4d85-9848-1627625d9566",
                    platformId: "11",
                    name: "Encounters of the Tidy Kind",
                    description: "Chapter 5 100% Completion",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "eac018ad-534e-449f-9afc-b711c8200c31",
                    platformId: "12",
                    name: "Tidy Triumph",
                    description: "Find all solutions in A Little to the Left (100% Completion)",
                    type: "100",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "73673d05-4ba8-4a71-b56f-f3cfb57e68ef",
                    platformId: "13",
                    name: "Seeing In A New Light",
                    description: "Solve a puzzle multiple ways",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "590d0fc2-956c-46d5-b85c-acfd44f3cbb9",
                    platformId: "14",
                    name: "Triple Threat",
                    description: "Solve a puzzle three ways",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "aaefedf0-2a10-459f-a86f-ddd1de6e2101",
                    platformId: "15",
                    name: "Helpful Hints",
                    description: "Take a hint",
                    type: "20",
                    image: "",
                    isAchieved: true,
                    dateAchieved: "2024-08-01T00:38:53.633Z",
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "f8721d79-f940-4084-8bc1-e8c06a2e6659",
                    platformId: "16",
                    name: "No Squint Hint",
                    description: "Complete the game without taking any hints (Requires clean playthrough)",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "d2624566-80e5-43b1-bc15-e5cb3a2f90bc",
                    platformId: "17",
                    name: "Hint Hunter",
                    description: "Reveal 10 hints",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "2ef3f8e3-0770-489c-a05a-26a5ba826163",
                    platformId: "18",
                    name: "One Clean Page",
                    description: "Fully reveal a hint",
                    type: "20",
                    image: "",
                    isAchieved: true,
                    dateAchieved: "2024-08-01T00:38:58.917Z",
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "ceea8850-a904-452f-a074-9ce4c68262ce",
                    platformId: "19",
                    name: "Let It Be",
                    description: 'Skip a level with "Let It Be"',
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "021bff4a-2208-4396-a3ed-16ede1373cd8",
                    platformId: "20",
                    name: "What Is Will Be",
                    description: 'Skip 10 levels with "Let it Be"',
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "99e6f61b-f4fe-42f5-aab5-fb268e9ae78a",
                    platformId: "21",
                    name: "No Mess Left Behind",
                    description: "Finish the campaign without skipping a single level (Requires clean playthrough)",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "71dfa83c-9bb2-432e-855e-d7bafa29e9c7",
                    platformId: "22",
                    name: "Fun for Humans Too",
                    description: "Having a ball with a ball inside a ball",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "2d78dc07-01df-47b7-b7ec-2c588d8a5432",
                    platformId: "23",
                    name: "Bad Kitty",
                    description: "Where are your manners ?",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "dcd9056e-b220-4310-a601-163f66525bda",
                    platformId: "24",
                    name: "Keep Away",
                    description: "Quick like a cat",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "ce3afe9b-50ca-4259-82f3-0533417733f7",
                    platformId: "25",
                    name: "Sweep Them On The Floor",
                    description: "We'll worry about these bits later",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "7d9d779e-ee12-474c-a021-de993642f46c",
                    platformId: "26",
                    name: "Exacting Eggs",
                    description: "Balance the carton in minimum number of moves",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "74ceaae7-9531-48ce-88e0-d538c8414e06",
                    platformId: "27",
                    name: "Draw Me A Rainbow",
                    description: "Looks like we're missing a colour?",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "3ae034bd-abab-45a1-bd49-69da7741b1e1",
                    platformId: "28",
                    name: "Harmonized Purr",
                    description: "Purr-fect rhythm",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "01d51468-814a-4dbd-aea7-41cfaeb699b4",
                    platformId: "29",
                    name: "Rainbow To The Moon",
                    description: "Complete the tower continuing the starting colour sequence",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "b8bdc093-8ecb-41ae-8e06-7c16bad1b7cc",
                    platformId: "30",
                    name: "Unstable Stacker",
                    description: "Complete the tower by using every available spot",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "c39df1d8-9df7-4f88-9db4-08de41360336",
                    platformId: "31",
                    name: "Be The Chaos",
                    description: "Bat every name (first or last) and job title in the credits",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "851530f3-d19f-4b20-97b7-077bcc0014d3",
                    platformId: "32",
                    name: "Path of Destruction",
                    description: "What a mess",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6e63e4fd-6b92-4ed8-953b-5c4b380353b1",
                    platformId: "33",
                    name: "Today's Tidy",
                    description: "Complete your first Daily Tidy",
                    type: "5",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6451d963-eae6-4f99-a671-71113faf73ef",
                    platformId: "34",
                    name: "Tidy Toddler",
                    description: "Complete 3 Daily Tidy's",
                    type: "5",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "694efacd-5a67-4e9b-887a-5cb307ef45cc",
                    platformId: "35",
                    name: "My Lucky Number",
                    description: "Complete 7 Daily Tidy's",
                    type: "5",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "59830217-49c3-4760-a6c2-3957b1ec884e",
                    platformId: "36",
                    name: "Neat As A Pin",
                    description: "Complete 14 Daily Tidy's",
                    type: "5",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "e9418463-66ed-41dd-9d84-af65418015c4",
                    platformId: "37",
                    name: "Flip the Calendar",
                    description: "Complete 30 Daily Tidy's",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "a3b23574-fbc7-42b8-9346-511fa6413ae4",
                    platformId: "38",
                    name: "Halfway There",
                    description: "Complete 50 Daily Tidy's",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "ce3b589c-1c71-464f-8bc3-1f6de0e14528",
                    platformId: "39",
                    name: "Three-quarter Sorter",
                    description: "Complete 75 Daily Tidy's",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6d096101-10ec-4d7a-af65-2f7e834822a7",
                    platformId: "40",
                    name: "Sqweeky Clean",
                    description: "Complete 7 consecutive Daily Tidy's",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "d40ace54-e0d9-4e16-ae7f-f115b499e601",
                    platformId: "41",
                    name: "Two-week Sweep",
                    description: "Complete 14 consecutive Daily Tidy's",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "6cdc6a09-b4c9-49dc-aa88-dc95de84c07b",
                    platformId: "42",
                    name: "Calendar Collector",
                    description: "Complete 30 consecutive Daily Tidy's",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "94b16a65-eca4-460f-bf56-755b4ecdfa1e",
                    platformId: "43",
                    name: "Highly Decorated",
                    description: "Achieve all Daily Tidy badge ranks",
                    type: "75",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "370c65d2-c16e-421f-8d30-0c039bc0a35a",
                    platformId: "45",
                    name: "Triple Digit Tidier",
                    description: "Tidy 100 Items",
                    type: "5",
                    image: "",
                    isAchieved: true,
                    dateAchieved: "2024-08-01T00:39:24.197Z",
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "b80a4739-22fb-4130-ad16-a72c9bcb3ca2",
                    platformId: "46",
                    name: "Categorization Cadet",
                    description: "Tidy 250 Items",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "3c095d39-0038-4504-a1f9-b203d5b1ce91",
                    platformId: "47",
                    name: "Adept Aligner",
                    description: "Tidy 500 Items",
                    type: "15",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "41571971-b834-4c70-b526-e02cade68d08",
                    platformId: "48",
                    name: "Extraordinary Organizer",
                    description: "Tidy 1000 Items",
                    type: "40",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "81c035bc-eb35-411e-8a35-683431364792",
                    platformId: "49",
                    name: "The Other Side",
                    description: "Complete the Cupboard and Drawers DLC",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "2ce102cb-3f3a-48d2-b4fc-9c12a76756fb",
                    platformId: "50",
                    name: "Everything Put Away",
                    description: "Find all solutions in the Cupboards and Drawers DLC (100% Completion)",
                    type: "50",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "a88a46e4-d5bc-47a1-8f2a-fdda2b09ff24",
                    platformId: "51",
                    name: "Where Is My Cap?",
                    description: "Every cap has a new owner, but no two owners traded their caps",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "3467b00d-68f0-4c3e-af5e-333d56014e25",
                    platformId: "52",
                    name: "Can Do Altitude",
                    description: "That's one epic stack",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "55387eb9-a553-4d61-8265-1a6bb807ec24",
                    platformId: "53",
                    name: "A Balanced Meal",
                    description: "All you can eat",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "8c62fd5a-399e-4e7d-9f50-2bf82ca46338",
                    platformId: "54",
                    name: "In No Rush",
                    description: "Sit with the cat for a while",
                    type: "15",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "a74ba64e-77a8-4ab1-93b8-502e9c890a58",
                    platformId: "55",
                    name: "Now You’re Playing With Power",
                    description: "A blast to the past",
                    type: "20",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "8887738f-cb0b-415e-87b1-1d2ce1283199",
                    platformId: "56",
                    name: "Show Off",
                    description: "Be proud of your accomplishments",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "28485546-1cfd-4b09-a38f-3eba215ae2d5",
                    platformId: "57",
                    name: "Shooting Star",
                    description: "Complete the Seeing Stars DLC main campaign",
                    type: "25",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "fd32daa2-2f3a-4bbc-832a-ae72936d1031",
                    platformId: "58",
                    name: "Nine Lives",
                    description: "Complete the bonus finale in the Seeing Stars DLC",
                    type: "30",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "ce16b586-d88c-4992-a25b-127e75774c0a",
                    platformId: "59",
                    name: "Full Orbit",
                    description: "Find all 100 solutions in the Seeing Stars DLC (100% Completion)",
                    type: "65",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "69af2638-f544-493b-af46-8932fe888455",
                    platformId: "60",
                    name: "Sticky Wand",
                    description: "Introducing our newest flavour",
                    type: "15",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "1c4bb015-1fa2-4205-af96-42884a5b3b53",
                    platformId: "61",
                    name: "I'll Take My Water Neat",
                    description: "I like my drinks lukewarm",
                    type: "5",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "78932624-d0b2-4c6e-971b-67c2b93f0541",
                    platformId: "62",
                    name: "Whatcha Lookin' At?",
                    description: "I'll go left, you go right",
                    type: "15",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "84ba80ad-308d-4a42-b438-63e02ccfd90a",
                    platformId: "63",
                    name: "Keeping Count",
                    description: "Solve the Music Box with the Counter set to the hidden number",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "9d6a6979-4772-4673-b8c1-e5ce75ae5aff",
                    platformId: "64",
                    name: "Dead End Boss Gems",
                    description: "That doesn't look like anything",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "d587011f-d063-4325-91c8-ce024246adaa",
                    platformId: "65",
                    name: "Top Heavy Slice",
                    description: "All for one",
                    type: "10",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                },
                {
                    id: "a484572d-238e-4954-9d3e-35a6f642d61e",
                    platformId: "66",
                    name: "Grabbed the Wrong End",
                    description: "Ouch, that's sharp",
                    type: "15",
                    image: "",
                    isAchieved: false,
                    dateAchieved: null,
                    percentageAchieved: "0.00",
                    gameId: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39"
                }
            ]
        });
    }
}
