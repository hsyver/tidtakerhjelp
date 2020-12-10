import {
  ActionReducerMap,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromOpprett from '../opprett-arr/state/opprett-arr.reducer';
import * as fromPaamelding from '../paameldingsliste/state/paameldingsliste.reducer';
import * as fromTider from '../tider/state/tider.reducer';

export interface AppState {
  opprett: fromOpprett.State;
  paamelding: fromPaamelding.State;
  tider: fromTider.State;
}

export const reducers: ActionReducerMap<AppState> = {
  opprett: fromOpprett.reducer,
  paamelding: fromPaamelding.reducer,
  tider: fromTider.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getOpprettState = (state: AppState) => state.opprett;

export const getArrNavn = createSelector(getOpprettState, fromOpprett.getArrNavn);
export const getRunderKvinner = createSelector(getOpprettState, fromOpprett.getRunderKvinner);
export const getRunderMenn = createSelector(getOpprettState, fromOpprett.getRunderMenn);
export const getArchived = createSelector(getOpprettState, fromOpprett.getArchived);
export const getError = createSelector(getOpprettState, fromOpprett.getError);

export const getPaameldingState = (state: AppState) => state.paamelding;

export const getMedlemmer = createSelector(getPaameldingState, fromPaamelding.getMedlemmer);
export const getPaameldinger = createSelector(getPaameldingState, fromPaamelding.getPaameldinger);

export const getTiderState = (state: AppState) => state.tider;

export const getPasseringstider = createSelector(getTiderState, fromTider.getPasseringstider);

