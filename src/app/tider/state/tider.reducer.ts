import * as TiderActions from './tider.actions';
import * as OpprettActions from '../../opprett-arr/state/opprett-arr.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    passeringstider: {id: number, startnr: number, tid: string}[];
};

export const initialState: State = {
    passeringstider: null,
};

const tiderReducer = createReducer(
    initialState,

    on(TiderActions.LoadPasseringstiderComplete, (state, { passeringstider }) => {
        return {
            ...state,
            passeringstider: passeringstider
        }
    }),

    on(OpprettActions.loadArr, (state) => {
        return {
          ...state,
          passeringstider: null,
        }
      }),

);

export function reducer(state: State | undefined, action: Action) {
    return tiderReducer(state, action);
}

export const getPasseringstider = (state: State) => state.passeringstider;