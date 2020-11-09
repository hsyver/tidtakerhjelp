import { createAction, props } from '@ngrx/store';
import { Startform } from '../../models/startform.enum';

export const OpprettArr = createAction(
    '[Opprett] Opprett arrangement',
    props<{runderMenn: number, runderKvinner: number}>()  
);

export const OpprettArrComplete = createAction(
    '[Opprett] Arrangement opprettet',
    props<{arrKode: number}>()  
);

export const OpprettArrError = createAction(
    '[Opprett] Opprett arrangement feilet',
    props<{error: string}>()  
);

export const loadArr = createAction(
    '[Last] Last arrangement',
    props<{arrKode: number}>()
);

export const loadArrFailed = createAction(
    '[Last] Last arrangement feilet',
    props<{error: string}>()
);

export const setArr = createAction(
    '[Last] Sett arrangement',
    props<{arrKode: number, startform: Startform, runderMenn: number, runderKvinner: number}>()
);