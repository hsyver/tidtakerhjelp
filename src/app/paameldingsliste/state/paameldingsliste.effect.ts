import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mapTo, switchMap, map } from 'rxjs/operators';
import { PaameldingService } from '../../services/paamelding.service'

import * as PaameldingActions from './paameldingsliste.actions';
import { Medlem } from "../../models/medlem.model";

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
                            console.log(m)
                            return PaameldingActions.LoadMedlemmerComplete({medlemmer: m})
                        })
                    )
            })
            //mapTo(PaameldingActions.LoadMedlemmerComplete({medlemmer: this.paameldingService.getMedlemmer()}))
        )
    );

    constructor(private paameldingService: PaameldingService, private actions$: Actions) {}
}   