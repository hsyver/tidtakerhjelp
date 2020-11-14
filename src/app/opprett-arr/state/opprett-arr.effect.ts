import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, Effect } from "@ngrx/effects";
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { OpprettService } from '../../services/opprett.service'
import { Router } from '@angular/router'

import * as OpprettActions from './opprett-arr.actions';
import { Startform } from "../../models/startform.enum";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Arrangement } from "../../models/arrangement.model";

@Injectable()
export class OpprettArrEffects {
    loadArr$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Last arrangement'),
            switchMap((action) => {
                return this.opprettService
                    .getArr(action.arrKode)
                    .pipe(
                        map((arr: Arrangement) => {
                            console.log(arr.arrKode);
                            console.log(arr.navn);
                            console.log(arr.dato);
                            console.log(new Date(arr.dato));
                            console.log(new Date().valueOf());
                            console.log(Math.floor((new Date().valueOf()-new Date(arr.dato).valueOf())/(1000*3600*24)))
                            console.log(arr.startform);
                            console.log(arr.runderMenn);
                            console.log(arr.runderKvinner);
                            
                            let timediff = new Date().valueOf() - new Date(arr.dato).valueOf()
                            let diffInDays = Math.floor(timediff / (1000 * 3600 * 24))
                            let archived = diffInDays > 10;
                            console.log(archived);

                            return OpprettActions.setArr({ arrangement: arr, archived: archived })
                        }),
                        catchError(error => of(OpprettActions.loadArrFailed({ error: 'Fant ingen arrangement med ArrKode '+action.arrKode })))
                    )
            })
        )
    );

    createArr$ = createEffect((): any => 
        this.actions$.pipe(
            ofType('[Opprett] Opprett arrangement'),
            switchMap((action) => {
                return this.opprettService
                    .opprettArr(action.arrangement)
                    .pipe(
                        map((arr: Arrangement) => {
                            return OpprettActions.setArr({ arrangement: arr, archived: false })
                        })
                    )
            })
        )
    );
    
    routeToPaamelding$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Last] Sett arrangement'),
            tap((action) => {
                this.router.navigate(['paameldingsliste'], { queryParams: { arrKode: action.arrangement.arrKode } });
            })
        ), { dispatch: false }
    );

    constructor(private opprettService: OpprettService, private actions$: Actions<OpprettActions.OpprettActionsUnion>, private router: Router) {}
}