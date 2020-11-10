import { Medlem } from '../../models/medlem.model';
import { Paamelding } from '../../models/paamelding.model';
import * as PaameldingActions from './paameldingsliste.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    medlemmer: Medlem[];
    paameldinger: Paamelding[];
    error: string;
};

export const initialState: State = {
    medlemmer: [],
    paameldinger: [],
    error: 'ba',
};

const paameldingReducer = createReducer(
    initialState,

    on(PaameldingActions.LoadMedlemmerComplete, (state, { medlemmer }) => {
        return {
            ...state,
            medlemmer: medlemmer
        }
    }),

    on(PaameldingActions.LoadPaameldingerComplete, (state, { paameldinger }) => {
        return {
            ...state,
            paameldinger: paameldinger
        }
    }),

);

export function reducer(state: State | undefined, action: Action) {
    return paameldingReducer(state, action);
}

export const getMedlemmer = (state: State) => state.medlemmer;
export const getPaameldinger = (state: State) => state.paameldinger;
export const getError = (state: State) => state.error;