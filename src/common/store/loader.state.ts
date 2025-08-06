import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { DecreaseBlockCountAction, IncreaseBlockCountAction } from "./loader.action";

export const LOADER_STATE_TOKEN = new StateToken<LoaderStateModel>("loader");

export interface LoaderStateModel {
    numberOfLoadersActive: number;
}

@State<LoaderStateModel>({
    name: LOADER_STATE_TOKEN,
    defaults: {
        numberOfLoadersActive: 0
    }
})
@Injectable()
export class LoaderState {
    @Selector()
    public static isLoading(state: LoaderStateModel): boolean {
        return !!state.numberOfLoadersActive;
    }

    @Action(IncreaseBlockCountAction)
    public increaseBlockCountAction({ getState, patchState }: StateContext<LoaderStateModel>) {
        patchState({ numberOfLoadersActive: getState().numberOfLoadersActive + 1 });
    }

    @Action(DecreaseBlockCountAction)
    public decreaseBlockCountAction({ getState, patchState }: StateContext<LoaderStateModel>) {
        patchState({ numberOfLoadersActive: getState().numberOfLoadersActive - 1 });
    }
}
