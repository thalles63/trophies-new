import { GameFilter } from "../../modules/game/models/game-filter.interface";

export class UpdateBackgroundScreenshotAction {
    public static readonly type = "[App Core] Update the screenshot in the background";
    public constructor(public payload: string | undefined) {}
}

export class UpdateGamesListingFilterAction {
    public static readonly type = "[App Core] Update the filter to load games";
    public constructor(public payload: GameFilter) {}
}

export class UpdateIfUserIsLoggedInAction {
    public static readonly type = "[App Core] Update if the logged user";
    public constructor(public payload: boolean) {}
}
