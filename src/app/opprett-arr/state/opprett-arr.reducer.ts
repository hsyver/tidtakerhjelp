import * as OpprettActions from './opprett-arr.actions';
import { Startform } from '../../models/startform.enum';
import { on, createReducer, Action } from '@ngrx/store';


export interface State {
  arrKode: number;
  startform: Startform;
  runderMenn: number;
  runderKvinner: number;
  error: string;
};

export const initialState: State = {
  arrKode: null,
  startform: Startform.Intervallstart,
  runderMenn: 1,
  runderKvinner: 1,
  error: '',
};

const opprettReducer = createReducer(
  initialState,

  on(OpprettActions.OpprettArrComplete, (state, { arrKode }) => {
    return {
      ...state,
      arrKode: arrKode
    }
  }),

  on(OpprettActions.OpprettArrError, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  }),

  on(OpprettActions.setArr, (state, { arrKode, startform, runderMenn, runderKvinner }) => {
    return {
      ...state,
      arrKode: arrKode,
      startform: startform,
      runderMenn: runderMenn,
      runderKvinner: runderKvinner,
      error: ''
    }
  }),

  on(OpprettActions.loadArrFailed, (state, { error }) => {
    return {
      ...state,
      error: error
    }
  })

);

export function reducer(state: State | undefined, action: Action) {
  return opprettReducer(state, action);
}

export const getArrKode = (state: State) => state.arrKode;
export const getError = (state: State) => state.error;