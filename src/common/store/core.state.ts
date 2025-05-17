import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { UpdateBackgroundScreenshot } from "./core.action";

interface CoreStateModel {
    backgroundScreenshot?: string;
}

@State<CoreStateModel>({
    name: new StateToken<CoreStateModel>("core"),
    defaults: {
        backgroundScreenshot: undefined
    }
})
@Injectable()
export class CoreState {
    @Selector()
    public static backgroundScreenshot(state: CoreStateModel): string | undefined {
        return state.backgroundScreenshot;
    }

    @Action(UpdateBackgroundScreenshot)
    public updateBackgroundScreenshot({ patchState }: StateContext<CoreStateModel>, { payload }: UpdateBackgroundScreenshot) {
        patchState({ backgroundScreenshot: payload });
    }
}
