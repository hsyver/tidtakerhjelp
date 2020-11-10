import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, tap, switchMap } from 'rxjs/operators';
import { OpprettService } from '../../services/opprett.service'
import { Router } from '@angular/router'

import * as OpprettActions from './opprett-arr.actions';
import { Startform } from "../../models/startform.enum";

@Injectable()
export class OpprettArrEffects {
    loadArr$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Last arrangement'),
            map(action => OpprettActions.setArr({arrKode: action.arrKode, startform: Startform.Fellesstart, runderKvinner: 1, runderMenn: 1}))
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
                            return OpprettActions.OpprettArrComplete({arrKode: arr})
                        })
                    )
            })
        )
    );
    
    routeToPaamelding$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Sett arrangement'),
            tap(() => {
                this.router.navigate(['paameldingsliste']);
            })
        ), { dispatch: false }
    );

    constructor(private opprettService: OpprettService, private actions$: Actions<OpprettActions.OpprettActionsUnion>, private router: Router) {}
}