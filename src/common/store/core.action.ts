import { PaginationInfo } from "../models/pagination.interface";

export class UpdateBackgroundScreenshotAction {
    public static readonly type = "[App Core] Update the screenshot in the background";
    public constructor(public payload: string | undefined) {}
}

export class UpdateGamesListingFilterAction {
    public static readonly type = "[App Core] Update the filter to load games";
    public constructor(public payload: Partial<PaginationInfo>) {}
}
