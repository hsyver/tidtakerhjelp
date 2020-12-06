import { createAction, props, union } from '@ngrx/store';
import { Arrangement } from '../../models/arrangement.model';

export const OpprettArr = createAction(
    '[Opprett] Opprett arrangement',
    props<{arrangement: Arrangement}>()  
);

export const OpprettArrError = createAction(
    '[Opprett] Opprett arrangement feilet',
    props<{error: string}>()  
);

export const loadArr = createAction(
    '[Last] Last arrangement',
    props<{arrKode: number, routeToPaameldingsliste: boolean}>()
);

export const loadArrFailed = createAction(
    '[Last] Last arrangement feilet',
    props<{error: string}>()
);

export const setArr = createAction(
    '[Last] Sett arrangement',
    props<{arrangement: Arrangement, archived: boolean, routeToPaameldingsliste: boolean}>()
);

const all = union({
    OpprettArr,
    OpprettArrError,
    loadArr,
    loadArrFailed,
    setArr
  });
  
  export type OpprettActionsUnion = typeof all;