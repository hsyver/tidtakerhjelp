import { Medlem } from '../../models/medlem.model';
import { Paamelding } from '../../models/paamelding.model';
import * as PaameldingActions from './paameldingsliste.actions';
import * as OpprettActions from '../../opprett-arr/state/opprett-arr.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    medlemmer: Medlem[];
    paameldinger: Paamelding[];
};

export const initialState: State = {
    medlemmer: [],
    paameldinger: [],
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

    on(PaameldingActions.AddPaameldingComplete, (state, { paamelding }) => {
        return {
            ...state,
            paameldinger: [...state.paameldinger, paamelding]
        }
    }),

    on(PaameldingActions.DeletePaameldingComplete, (state, { id }) => {
        return {
            ...state,
            paameldinger: [...state.paameldinger.filter(p => p.id != id)]
        }
    }),

    on(OpprettActions.loadArr, (state) => {
        return {
            ...state,
            paameldinger: []
        }
    }),

);

export function reducer(state: State | undefined, action: Action) {
    return paameldingReducer(state, action);
}

export const getMedlemmer = (state: State) => state.medlemmer;
export const getPaameldinger = (state: State) => state.paameldinger;