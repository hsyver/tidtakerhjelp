import { createAction, props, union } from '@ngrx/store';
import { Medlem } from '../../models/medlem.model';
import { Paamelding } from '../../models/paamelding.model';

export const LoadMedlemmer = createAction(
    '[Paamelding] Last medlemmer'
);

export const LoadMedlemmerComplete = createAction(
    '[Paamelding] Medlemmer lastet',
    props<{medlemmer: Medlem[]}>()
);

export const LoadPaameldinger = createAction(
    '[Paamelding] Last påmeldinger',
    props<{arrKode: number}>()
);

export const LoadPaameldingerComplete = createAction(
    '[Paamelding] Påmeldinger lastet',
    props<{paameldinger: Paamelding[]}>()
);

export const AddPaamelding = createAction(
    '[Paamelding] Legg til påmelding',
    props<{paamelding: Paamelding, arrKode: number}>()
);

export const AddPaameldingComplete = createAction(
    '[Paamelding] Påmelding lagt til',
    props<{paamelding: Paamelding}>()
);

export const DeletePaamelding = createAction(
    '[Paamelding] Slett påmelding',
    props<{id: number, arrKode: number}>()
);

export const DeletePaameldingComplete = createAction(
    '[Paamelding] Påmelding slettet',
    props<{id: number}>()
);

const all = union({
    LoadMedlemmer,
    LoadMedlemmerComplete,
    LoadPaameldinger,
    LoadPaameldingerComplete,
    AddPaamelding,
    AddPaameldingComplete,
    DeletePaamelding,
    DeletePaameldingComplete
  });
  
  export type PaameldingActionsUnion = typeof all;