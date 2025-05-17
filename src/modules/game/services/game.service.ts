import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class GameService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = `${environment.API_URL}/game`;

    // public getById(gameId: string) {
    //     return this.http.get<Game>(`${this.API_URL}/${gameId}`);
    // }

    public getById(gameId: string) {
        return of({
            id: "e7ec66d1-3ce1-415d-950f-289b4e630daf",
            igdbId: "1310410",
            platformId: "1310410",
            name: "Alone in the Dark",
            status: 2,
            description:
                "Alone in the Dark presents itself as a reboot of the classic 1992 survival horror game featuring a noir-setting with horror elements and a moody atmosphere of darkness and shadows carried by terrifying visuals. The game revolves around investigating the environments for clues and solving puzzles to advance in the story, which the player can choose how much the game will help on finding these clues and where to go next. This reboot bears an interestingly similar fashion to the first games' mechanics but massively modernized and improved upon.",

            image: "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co52t8.jpg",
            platform: 5,
            timePlayed: 67680,
            isPlatinumed: true,
            dateCompleted: "2025-04-01T18:05:45.000Z",
            isCampaignComplete: true,
            screenshot: "https://images.igdb.com/igdb/image/upload/t_1080p_2x/scic8h.jpg",
            rating: 0,
            lastUnlock: null,
            deletedAt: null,
            createdAt: "2025-05-16T20:00:10.893Z",
            updatedAt: "2025-05-16T20:15:48.480Z",
            achievements: [
                {
                    id: "63c5bbd9-f258-43e3-bb01-2ef8ab3b905e",
                    platformId: "ACH_ID_01",
                    name: "The Thin Veneer of Civilization",
                    description: "Break through a barrier",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/8360d486af8d0cb2ec563a59ee77a82742d92d7f.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T14:20:54.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "0ebbb25f-4def-4525-bb0d-8cf9eeec30c2",
                    platformId: "ACH_ID_02",
                    name: "Whatever It Takes",
                    description: "Kill a monster with an opportunity",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/3d40e1e834faa86c2be1e7c2421b4734c597e2e5.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-24T21:02:18.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "71026d83-0016-42df-b5d6-746d3681ba20",
                    platformId: "ACH_ID_03",
                    name: "Come At Me!",
                    description: "Kill a monster with a melee weapon",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/e5ec9ea1db9fb886e3bdc40fa2f93f951c9f6afc.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T14:15:59.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "966a16b5-0004-4259-b864-ebf8154b3cbe",
                    platformId: "ACH_ID_04",
                    name: "Now You're On the Trolley!",
                    description: "Kill a monster with a ranged weapon",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/81c3930a65fd0660e3cd4ad6a86dd30a165f3fcb.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T13:14:53.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "7143aa77-3b88-431e-aa43-faf2c24625d4",
                    platformId: "ACH_ID_05",
                    name: "On the Mend",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/578e05caafa5edde1abf18db689a25983a5fc322.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T14:15:59.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "c9d6b84c-9a2f-405b-bc47-ccdb0cd27870",
                    platformId: "ACH_ID_06",
                    name: "I Don’t Got All Night",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/44954bcb0eddf039e68b4a5f2eb0d0ac87567656.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:16:23.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "abfad884-8bf9-4019-848d-53ddcdee0b73",
                    platformId: "ACH_ID_07",
                    name: "An Honest Day’s Work",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/392a409f2e3a9308f69edcbad3c4b0af2a7a1139.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T16:32:15.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "56e7e275-6df9-46d7-aa65-b5958efca10b",
                    platformId: "ACH_ID_08",
                    name: "Welcome to Derceto",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/03f6ce5aad7148369685940a3c2dbe1e8bddeccc.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T11:14:47.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "8522ba36-7e78-4441-961d-6ec2f52566b4",
                    platformId: "ACH_ID_09",
                    name: "In Between There Are Doors",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/4e0ad1ff191ef40ad2d8a20ce81aca51e5f50c54.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T13:16:52.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "95e788bb-d7d9-4c8b-ae01-26439c0fd7c3",
                    platformId: "ACH_ID_10",
                    name: "Left Holding the Bag",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/c343c1353dff2e10388fb81afc8d88d6b71804f3.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T14:33:44.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "d3e13489-fb44-4663-8a50-e191a031be54",
                    platformId: "ACH_ID_11",
                    name: "Found & Lost",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/13241776113a4dd613c342dec00b2b87b0e09a0f.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-25T11:01:18.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "a734fae6-5aa4-4062-bae0-594b6af32a16",
                    platformId: "ACH_ID_12",
                    name: "Somewhere Else Entirely",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/cb1e41d99f2a70acdd2633f2bc137387e09e556d.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-25T11:06:54.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "8130ad00-ca44-477a-a7cf-d1d0b297cf73",
                    platformId: "ACH_ID_13",
                    name: "Drop Me Off In New Orleans",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/e62773035c2bb7a1c3406e86000fe2f4933d46cb.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T10:39:59.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "d3fc8e4b-a4f4-4bcd-b7cf-25f07f7d1f44",
                    platformId: "ACH_ID_14",
                    name: "Losing My Mind",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/0b165f0b7215303c837d0d0c1e805c36ca91536a.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T10:57:44.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "e848793d-7ad6-4445-98f3-061c1bd4965d",
                    platformId: "ACH_ID_15",
                    name: "Where I Belong",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/dee796eb83062fe3b1bfcd5981aaf1f329b023eb.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T11:14:05.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "23d29b5b-6237-40b4-9e0f-ef7bc7eec4af",
                    platformId: "ACH_ID_16",
                    name: "I Abandoned Him",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/ab8507809f48ac3aa18d5a1692d831649a857cc8.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-27T13:54:04.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "11207b10-e5cd-40b3-a408-e0724de73d36",
                    platformId: "ACH_ID_17",
                    name: "I Stole the Child and Let Him Drown",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/c799cd6283bf419d62d0c59e4cac96fe1e2e1b16.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T16:31:38.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "076fc12b-4da8-48de-bdfc-43a2fb8a06a6",
                    platformId: "ACH_ID_18",
                    name: "When Therapy Makes It Worse",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/77da0996dfc97e25406586ce34f18f19f5ea2c0d.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T20:52:39.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "fb3e42fa-91be-4a79-9242-b0f38c368fd4",
                    platformId: "ACH_ID_19",
                    name: "The Past as a Present",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/37f31b25575028fbf246630a8458a0713362b621.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T20:58:29.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "9935d7f5-7e2c-4efa-bea3-bb421000c7b6",
                    platformId: "ACH_ID_20",
                    name: "Frenzy",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/7607b670818bea244f266833dc6f7975e548233c.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:06:51.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "b550da1d-befd-4c2d-b95f-8f9180e179df",
                    platformId: "ACH_ID_21",
                    name: "Back to Normal",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/7d0b00154a34beb30eb694d4aabdcfc47e75b1e0.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:21:55.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "ce745071-936e-4291-b1b1-9ead8730b5ff",
                    platformId: "ACH_ID_22",
                    name: "Case Closed",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/3f0b06a1a495778d968ff71190172241573edcfe.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T17:06:21.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "b0a9e23c-af2c-4cca-bebf-221ce15f73ac",
                    platformId: "ACH_ID_23",
                    name: "Safe and Sound",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/5b69307f0f7a4e490b330f657844efc4b6907da6.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T22:10:01.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "c80a560d-2ef5-47af-9f60-3bbd0642dab5",
                    platformId: "ACH_ID_24",
                    name: "Don’t Mind If I Do",
                    description: "Finish a Lagniappe set",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/272fc493a09e5ee02a76871ac3802e9e616011ac.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T14:34:39.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "bfeb8286-9678-42e5-8ca7-db115d928549",
                    platformId: "ACH_ID_25",
                    name: "Watch Out Where You’re Waving That Thing",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/474490f46fc9a608bb6266f66796bfc88670eb25.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-29T14:39:37.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "86ddd247-dfb8-48be-8bd5-887b43a77900",
                    platformId: "ACH_ID_26",
                    name: "What Just Happened?",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/924f99f712e0370b4a3e5e3a6a644c9b1a26cf37.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T16:55:02.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "41d5075b-a380-4cbb-b526-3e922b1d4285",
                    platformId: "ACH_ID_27",
                    name: "Nobody Knows What Happened",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/53149d3ba3eebc0fe9305a59f389a4c43231552b.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T20:41:10.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "25676e1d-2334-40a6-85c4-8646ab259145",
                    platformId: "ACH_ID_28",
                    name: "Radical Acceptance",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/214f5c5250eda8c74e73af350265dbf52dccd1e2.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:16:23.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "1fe12b1a-100b-4a39-a573-fce49adea37d",
                    platformId: "ACH_ID_29",
                    name: "One of the Thousand Young",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/2f6c1353f42703f8b9ac95303350947c008d3bb3.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T18:05:45.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "078f5086-b6b8-42de-8b49-fd72a2fceb7a",
                    platformId: "ACH_ID_30",
                    name: "Bonfire Night",
                    description: "Kill an enemy with fire",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/0d931fffd9eae7cbaac8371217c95384824cd77f.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-24T21:06:11.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "10e8ccd6-7d3b-422b-8122-c2cd38be0bcc",
                    platformId: "ACH_ID_31",
                    name: "Hard Boiled",
                    description: "Kill an enemy with shotgun",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/06abd18f93d9db08f1f9f92f0d3db5bc15a51cb8.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-22T15:19:31.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "b1ccc5e6-399a-48bd-980a-b8f105e97406",
                    platformId: "ACH_ID_32",
                    name: "Gangster",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/858021d2123026e9bd083b22923183f109fae047.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:13:02.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "d3971cb8-ea1a-468b-a301-aa64b66892c8",
                    platformId: "ACH_ID_33",
                    name: "You Can’t Keep Me Out!",
                    description: "Open all of the safes and locks in the game.",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/72ece83995c090ff5b19c273ada6b4f21ecfea3c.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T15:57:56.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "85c2a4f5-1688-4fed-b5b2-0282bb335e65",
                    platformId: "ACH_ID_34",
                    name: "Chatterbox",
                    description: null,
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/2ad45b18fbc564a40dab99f49f34c41e9ede93f8.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T16:52:50.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "e8bf84c5-4cf6-4c72-a3f9-44ccf32ee100",
                    platformId: "ACH_ID_35",
                    name: "Look At All the Free Stuff I Got!",
                    description: "Find all the lagniappes",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/e6a05c5f0502774c84a6aee9071192a944cccca1.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T14:54:06.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "e7e84096-e342-4ba8-a554-e1291484a6fe",
                    platformId: "ACH_ID_36",
                    name: "Teetotaller",
                    description: "Finish the game without drinking from your flask",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/fa35deb3ec74b95c0233d6725fcc8f50d987b8cb.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-03-26T21:16:23.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "99c93f5e-846b-4231-bc44-53f538265239",
                    platformId: "ACH_ID_37",
                    name: "Librarian",
                    description: "Read all the clues",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/a4c3df57edd7f49bdfd0e3291df67e5f8290c06d.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T14:34:58.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                },
                {
                    id: "91ff3bc3-9dc3-420f-81ec-dec8ed2a01d0",
                    platformId: "Ach_ID_39",
                    name: "Alone in the Dark",
                    description: "All Achievements",
                    type: "0",
                    image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/1310410/58e73595c1ecf1f12d44ce8aacd77d8c8ac25dea.jpg",
                    isAchieved: true,
                    dateAchieved: "2025-04-01T18:05:45.000Z",
                    percentageAchieved: "0.00",
                    gameId: "e7ec66d1-3ce1-415d-950f-289b4e630daf"
                }
            ]
        });
    }
}
