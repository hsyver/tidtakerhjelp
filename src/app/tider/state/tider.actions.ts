import { createAction, props, union } from '@ngrx/store';

export const LoadPasseringstider = createAction(
    '[Tider] Last passeringstider',
    props<{arrKode: number}>()
);

export const LoadPasseringstiderComplete = createAction(
    '[Tider] Passeringstider lastet',
    props<{passeringstider: {id: number, startnr: number, tid: string}[]}>()
);

export const UpdatePasseringstider = createAction(
    '[Tider] Oppdater passeringstider',
    props<{startnr: number, passeringstider: string[], arrKode: number}>()
)

export const UpdatePasseringstiderComplete = createAction(
    '[Tid] Passeringstider oppdatert',
    props<{}>()   
);

const all = union({
    LoadPasseringstider,
    LoadPasseringstiderComplete,
    UpdatePasseringstider,
    UpdatePasseringstiderComplete,
  });
  
  export type TiderActionsUnion = typeof all;