import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromOpprett from '../opprett-arr/state/opprett-arr.reducer';
import * as fromPaamelding from '../paameldingsliste/state/paameldingsliste.reducer';

export interface AppState {
  opprett: fromOpprett.State;
  paamelding: fromPaamelding.State;
}

export const reducers: ActionReducerMap<AppState> = {
  opprett: fromOpprett.reducer,
  paamelding: fromPaamelding.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getOpprettState = (state: AppState) => state.opprett;

export const getArrKode = createSelector(getOpprettState, fromOpprett.getArrKode)

export const getPaameldingState = (state: AppState) => state.paamelding;

export const getMedlemmer = createSelector(getPaameldingState, fromPaamelding.getMedlemmer);
export const getPaameldinger = createSelector(getPaameldingState, fromPaamelding.getPaameldinger);
export const getError = createSelector(getPaameldingState, fromPaamelding.getError);


