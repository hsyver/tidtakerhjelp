import { createAction, props, union } from '@ngrx/store';

export const LoadResultatliste = createAction(
    '[Resultatliste] Last resultatliste',
    props<{arrKode: number}>()
);

export const LoadResultatlisteComplete = createAction(
    '[Resultatliste] Resultatliste lastet',
    props<{resultatliste: string}>()
);

const all = union({
    LoadResultatliste,
    LoadResultatlisteComplete,
  });
  
  export type ResultatlisteActionsUnion = typeof all;