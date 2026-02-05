import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { GameFilter } from "../../modules/game/models/game-filter.interface";
import { SortDirection } from "../enums/sort-direction.enum";
import { StatusEnum } from "../enums/status.enum";
import { UserInfo } from "../helpers/user-info";
import { UpdateBackgroundScreenshotAction, UpdateGamesListingFilterAction, UpdateIfUserIsLoggedInAction } from "./core.action";

interface CoreStateModel {
    backgroundScreenshot?: string;
    filter: GameFilter;
    isLoggedInUser: boolean;
}

@State<CoreStateModel>({
    name: new StateToken<CoreStateModel>("core"),
    defaults: {
        backgroundScreenshot: undefined,
        filter: <GameFilter>{ page: 1, sort: SortDirection.Descending, limit: 12, status: StatusEnum.PlayingCompleted },
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
    public static filter(state: CoreStateModel): GameFilter {
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
    public updateGamesListingFilterAction({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateGamesListingFilterAction) {
        patchState({ filter: payload });
    }

    @Action(UpdateIfUserIsLoggedInAction)
    public updateIfUserIsLoggedInAction({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateIfUserIsLoggedInAction) {
        patchState({ isLoggedInUser: payload });
    }
}
