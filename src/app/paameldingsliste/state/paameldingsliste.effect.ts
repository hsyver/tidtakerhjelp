import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mapTo, switchMap, map } from 'rxjs/operators';
import { PaameldingService } from '../../services/paamelding.service'

import * as PaameldingActions from './paameldingsliste.actions';
import { Medlem } from "../../models/medlem.model";
import { Paamelding } from "../../models/paamelding.model";

@Injectable()
export class PaameldingslisteEffects {
    loadMedlemmer$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Paamelding] Last medlemmer'),
            switchMap(() => {
                return this.paameldingService
                    .getMedlemmer()
                    .pipe(
                        map((m: Medlem[]) => {
                            return PaameldingActions.LoadMedlemmerComplete({medlemmer: m})
                        })
                    )
            })
        )
    );

    loadPaameldinger$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Paamelding] Last påmeldinger'),
            switchMap((action) => {
                return this.paameldingService
                    .getPaameldinger(action.arrKode)
                    .pipe(
                        map((p: Paamelding[]) => {
                            return PaameldingActions.LoadPaameldingerComplete({paameldinger: p})
                        })
                    )
            })
        )
    );

    constructor(private paameldingService: PaameldingService, private actions$: Actions<PaameldingActions.PaameldingActionsUnion>) {}
}   