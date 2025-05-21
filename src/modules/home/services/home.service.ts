import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Game } from "../../game/models/game.interface";

@Injectable()
export class HomeService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/game`;

    public listGames(page: number, size: number) {
        return this.http.get<{ games: Game[] }>(`${this.API_URL}`, {
            params: {
                page,
                limit: size
            }
        });
    }

    // public listGames() {
    //     return of({
    //         games: [
    //             {
    //                 id: "fbbc6d52-188d-4acc-9ad8-41b684c9ca39",
    //                 igdbId: "",
    //                 platformId: "2002870555",
    //                 name: "A Little to the Left",
    //                 image: "",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platform: 4,
    //                 timePlayed: 0,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "",
    //                 rating: 0,
    //                 lastUnlock: "2024-08-01T00:39:24.197Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:39:44.476Z",
    //                 updatedAt: "2025-05-16T19:21:06.044Z"
    //             },
    //             {
    //                 id: "7244a5b9-94d5-40d8-9bf3-0c238ec73b7d",
    //                 igdbId: "231037",
    //                 platformId: "NPWR22506_00",
    //                 name: "A Plague Tale: Innocence",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1lat.jpg",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platform: 2,
    //                 timePlayed: 79362,
    //                 isPlatinumed: true,
    //                 dateCompleted: "2022-07-08T22:24:07.000Z",
    //                 isCampaignComplete: true,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/ua97c9hmezzpqh2yw7aq.jpg",
    //                 rating: 2.5,
    //                 lastUnlock: "2022-07-08T22:24:23.570Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:26:02.261Z",
    //                 updatedAt: "2025-05-16T19:42:46.905Z"
    //             },
    //             {
    //                 id: "c0ac8e07-f639-4819-943a-bfec45f543da",
    //                 igdbId: "221659",
    //                 platformId: "NPWR11234_00",
    //                 name: "ABZU",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co28sy.jpg",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platform: 3,
    //                 timePlayed: 12056,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/rdsm1mvbg5tgcpnb6ptz.jpg",
    //                 rating: 5,
    //                 lastUnlock: "2017-06-05T20:24:09.340Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:28:48.700Z",
    //                 updatedAt: "2025-05-16T19:42:46.925Z"
    //             },
    //             {
    //                 id: "94b7014d-7633-42f0-8bb5-2aaca0fd73a2",
    //                 igdbId: "813230",
    //                 platformId: "813230",
    //                 name: "ANIMAL WELL",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4hdh.jpg",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platform: 5,
    //                 timePlayed: 4800,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/scftts.jpg",
    //                 rating: 4,
    //                 lastUnlock: null,
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T19:59:49.810Z",
    //                 updatedAt: "2025-05-16T20:15:47.157Z"
    //             },
    //             {
    //                 id: "675316a3-6cbb-4636-8d3d-12b155f55acd",
    //                 igdbId: "10000229",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "NPWR20188_00",
    //                 name: "ASTRO's PLAYROOM",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9hb4.jpg",
    //                 platform: 2,
    //                 timePlayed: 18817,
    //                 isPlatinumed: true,
    //                 dateCompleted: "2021-02-06T18:00:05.000Z",
    //                 isCampaignComplete: true,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/sc8bkl.jpg",
    //                 rating: 0,
    //                 lastUnlock: "2021-02-07T12:10:37.810Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:27:06.465Z",
    //                 updatedAt: "2025-05-16T19:42:46.997Z"
    //             },
    //             {
    //                 id: "a45bcdba-6397-465e-a90b-1a7a83f0e8ee",
    //                 igdbId: "216017",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "NPWR10578_00",
    //                 name: "Adam's Venture: Origins",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co229k.jpg",
    //                 platform: 3,
    //                 timePlayed: 17075,
    //                 isPlatinumed: true,
    //                 dateCompleted: "2020-03-08T21:21:08.000Z",
    //                 isCampaignComplete: true,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/pwyfspu8cftvrtuwye1v.jpg",
    //                 rating: 0,
    //                 lastUnlock: "2020-03-08T19:05:07.510Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:27:48.933Z",
    //                 updatedAt: "2025-05-16T19:42:47.014Z"
    //             },
    //             {
    //                 id: "dc6d45dd-ebfd-4ffb-a74d-426b7a91dd76",
    //                 igdbId: "",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "2064168993",
    //                 name: "Age of Empires II: Definitive Edition",
    //                 image: "",
    //                 platform: 4,
    //                 timePlayed: 0,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "",
    //                 rating: 0,
    //                 lastUnlock: "2024-01-28T23:03:28.193Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:39:47.838Z",
    //                 updatedAt: "2025-05-16T19:21:06.155Z"
    //             },
    //             {
    //                 id: "daa8b7d8-ea7e-4978-a531-2ef2ff9bfb88",
    //                 igdbId: "108710",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "108710",
    //                 name: "Alan Wake",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2dft.jpg",
    //                 platform: 5,
    //                 timePlayed: 0,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/yvbeukf7akfc2fkkzpmc.jpg",
    //                 rating: 0,
    //                 lastUnlock: null,
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T19:58:11.401Z",
    //                 updatedAt: "2025-05-16T19:58:11.401Z"
    //             },
    //             {
    //                 id: "011a1fd2-8572-4ac4-8e86-ed2fd1b3c36b",
    //                 igdbId: "10001478",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "NPWR22612_00",
    //                 name: "Alan Wake Remastered",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co65aa.jpg",
    //                 platform: 2,
    //                 timePlayed: 4313,
    //                 isPlatinumed: false,
    //                 dateCompleted: null,
    //                 isCampaignComplete: false,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/scd71r.jpg",
    //                 rating: 0,
    //                 lastUnlock: "2023-07-18T00:50:27.310Z",
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T17:24:48.511Z",
    //                 updatedAt: "2025-05-16T19:42:46.991Z"
    //             },
    //             {
    //                 id: "e7ec66d1-3ce1-415d-950f-289b4e630daf",
    //                 igdbId: "1310410",
    //                 description:
    //                     "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",
    //                 platformId: "1310410",
    //                 name: "Alone in the Dark",
    //                 image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co52t8.jpg",
    //                 platform: 5,
    //                 timePlayed: 67680,
    //                 isPlatinumed: true,
    //                 dateCompleted: "2025-04-01T18:05:45.000Z",
    //                 isCampaignComplete: true,
    //                 screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/scic8h.jpg",
    //                 rating: 0,
    //                 lastUnlock: null,
    //                 deletedAt: null,
    //                 createdAt: "2025-05-16T20:00:10.893Z",
    //                 updatedAt: "2025-05-16T20:15:48.480Z"
    //             }
    //         ],
    //         pagination: {
    //             page: 1,
    //             limit: 10,
    //             total: 296,
    //             pages: 30
    //         }
    //     });
    // }
}
