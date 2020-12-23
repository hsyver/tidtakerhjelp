import * as OpprettActions from './opprett-arr.actions';
import { Startform } from '../../models/startform.enum';
import { on, createReducer, Action } from '@ngrx/store';
import { Arrangement } from '../../models/arrangement.model';


export interface State {
  arrangement: Arrangement;
  archived: boolean;
  error: string;
};

export const initialState: State = {
  arrangement: {arrKode: null, navn: '', dato: new Date(), startform: Startform.Intervallstart, runderMenn: 1, runderKvinner: 1},
  archived: false,
  error: '',
};

const opprettReducer = createReducer(
  initialState,

  on(OpprettActions.OpprettArrError, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),

  on(OpprettActions.setArr, (state, { arrangement, archived }) => {
    return {
      ...state,
      arrangement: arrangement,
      archived: archived,
      error: '',
    }
  }),

  on(OpprettActions.loadArrFailed, (state, { error }) => {
    return {
      ...state,
      arrangement: null,
      archived: false,
      error: error
    }
  })

);

export function reducer(state: State | undefined, action: Action) {
  return opprettReducer(state, action);
}

export const getArrNavn = (state: State) => state.arrangement.navn;
export const getRunderKvinner = (state: State) => state.arrangement.runderKvinner;
export const getRunderMenn = (state: State) => state.arrangement.runderMenn;
export const getError = (state: State) => state.error;
export const getArchived = (state: State) => state.archived;