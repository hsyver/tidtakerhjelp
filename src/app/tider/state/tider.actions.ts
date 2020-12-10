import { createAction, props, union } from '@ngrx/store';

export const LoadPasseringstider = createAction(
    '[Tider] Last passeringstider',
    props<{arrKode: number}>()
);

export const LoadPasseringstiderComplete = createAction(
    '[Tider] Passeringstider lastet',
    props<{passeringstider: {id: number, startnr: number, tid: string}[]}>()
);

export const UpdatePasseringstid = createAction(
    '[Tider] Oppdater passeringstid',
    props<{id: number, passeringstid: string, arrKode: number}>()
)

export const UpdatePasseringstidComplete = createAction(
    '[Tid] Passeringstid oppdatert',
    props<{}>()   
);

export const AddPasseringstid = createAction(
    '[Tider] Legg til passeringstid',
    props<{startnr: number, passeringstid: string, arrKode: number}>()
)

export const AddPasseringstidComplete = createAction(
    '[Tid] Passeringstid lagt til',
    props<{}>()   
);

const all = union({
    LoadPasseringstider,
    LoadPasseringstiderComplete,
  });
  
  export type TiderActionsUnion = typeof all;