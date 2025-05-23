import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { PaginationInfo } from "../models/pagination.interface";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction } from "./core.action";

interface CoreStateModel {
    backgroundScreenshot?: string;
    filter: Partial<PaginationInfo>;
}

@State<CoreStateModel>({
    name: new StateToken<CoreStateModel>("core"),
    defaults: {
        backgroundScreenshot: undefined,
        filter: { page: 1, sort: 2, limit: 18 }
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

    @Action(UpdateBackgroundScreenshotAction)
    public updateBackgroundScreenshotAction({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateBackgroundScreenshotAction) {
        patchState({ backgroundScreenshot: payload });
    }

    @Action(UpdateGamesListingFilterAction)
    public updateGamesListingFilterAction({ getState, patchState }: StateContext<CoreStateModel>, { payload }: UpdateGamesListingFilterAction) {
        patchState({ filter: { ...getState().filter, ...payload } });
    }
}
