import * as ResultatlisteActions from './resultatliste.actions';
import * as OpprettActions from '../../opprett-arr/state/opprett-arr.actions';
import { Action, createReducer, on } from '@ngrx/store';


export interface State {
    resultatliste: string;
};

export const initialState: State = {
    resultatliste: null,
};

const resultatlisteReducer = createReducer(
    initialState,

    on(ResultatlisteActions.LoadResultatlisteComplete, (state, { resultatliste }) => {
        return {
            ...state,
            resultatliste: resultatliste
        }
    }),

    on(OpprettActions.loadArr, (state) => {
        return {
          ...state,
          resultatliste: null
        }
    }),

);

export function reducer(state: State | undefined, action: Action) {
    return resultatlisteReducer(state, action);
}

export const getResultatliste = (state: State) => state.resultatliste;