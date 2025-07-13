import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { UserInfo } from "../helpers/user-info";
import { PaginationInfo } from "../models/pagination.interface";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction, UpdateIfUserIsLoggedInAction } from "./core.action";

interface CoreStateModel {
    backgroundScreenshot?: string;
    filter: Partial<PaginationInfo>;
    isLoggedInUser: boolean;
}

@State<CoreStateModel>({
    name: new StateToken<CoreStateModel>("core"),
    defaults: {
        backgroundScreenshot: undefined,
        filter: { page: 1, sort: 2, limit: 18, status: 5 },
        isLoggedInUser: !!UserInfo.getToken()
    }
})
@Injectable()
export class CoreState {
    @Selector()
    public static backgroundScreenshot(state: CoreStateModel): string | undefined {
        return state.backgroundScreenshot;
    }

    @Selector()
    public static filter(state: CoreStateModel): Partial<PaginationInfo> {
        return state.filter;
    }

    @Selector()
    public static isLoggedInUser(state: CoreStateModel): boolean {
        return state.isLoggedInUser;
    }

    @Action(UpdateBackgroundScreenshotAction)
    public updateBackgroundScreenshotAction({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateBackgroundScreenshotAction) {
        patchState({ backgroundScreenshot: payload });
    }

    @Action(UpdateGamesListingFilterAction)
    public updateGamesListingFilterAction({ getState, patchState }: StateContext<CoreStateModel>, { payload }: UpdateGamesListingFilterAction) {
        patchState({ filter: { ...getState().filter, ...payload } });
    }

    @Action(UpdateIfUserIsLoggedInAction)
    public updateIfUserIsLoggedInAction({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateIfUserIsLoggedInAction) {
        patchState({ isLoggedInUser: payload });
    }
}
