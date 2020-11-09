import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, tap } from 'rxjs/operators';
import { OpprettService } from '../../services/opprett.service'
import { Router } from '@angular/router'

import * as OpprettActions from './opprett-arr.actions';
import { Startform } from "../../models/startform.enum";
import { dispatch } from "rxjs/internal/observable/range";

@Injectable()
export class OpprettArrEffects {
    loadArrr$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Last arrangement'),
            map(action => OpprettActions.setArr({arrKode: action.arrKode, startform: Startform.Fellesstart, runderKvinner: 1, runderMenn: 1}))
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

    constructor(private opprettService: OpprettService, private actions$: Actions, private router: Router) {}
}