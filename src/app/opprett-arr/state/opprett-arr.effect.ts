import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { OpprettService } from '../../services/opprett.service'
import { Router } from '@angular/router'

import * as OpprettActions from './opprett-arr.actions';
import { Startform } from "../../models/startform.enum";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class OpprettArrEffects {
    loadArr$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Last arrangement'),
            switchMap((action) => {
                return this.opprettService
                    .getArr(action.arrKode)
                    .pipe(
                        map((arr: number) => {
                            return OpprettActions.setArr({arrKode: arr, startform: Startform.Fellesstart, runderKvinner: 1, runderMenn: 1})
                        }),
                        catchError(error => of(OpprettActions.loadArrFailed({ error: 'Fant ingen arrangement med ArrKode '+action.arrKode })))
                    )
            })
        )
    );

    createArr$ = createEffect((): any => 
        this.actions$.pipe(
            ofType('[Opprett] Opprett arrangement'),
            switchMap(() => {
                return this.opprettService
                    .opprettArr()
                    .pipe(
                        map((arr: number) => {
                            return OpprettActions.setArr({arrKode: arr, startform: Startform.Fellesstart, runderKvinner: 1, runderMenn: 1})
                        })
                    )
            })
        )
    );
    
    routeToPaamelding$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Sett arrangement'),
            tap((action) => {
                this.router.navigate(['paameldingsliste'], { queryParams: { arrKode: action.arrKode } });
            })
        ), { dispatch: false }
    );

    constructor(private opprettService: OpprettService, private actions$: Actions<OpprettActions.OpprettActionsUnion>, private router: Router) {}
}