import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from 'rxjs/operators';
import { TiderService } from '../../services/tider.service'

import * as TiderActions from './tider.actions';

@Injectable()
export class TiderEffects {
    loadPasseringstider$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Tider] Last passeringstider'),
            switchMap((action) => {
                return this.tiderService
                    .getPasseringstider(action.arrKode)
                    .pipe(
                        map((p: {id: number, startnr: number, tid: string}[]) => {
                            return TiderActions.LoadPasseringstiderComplete({passeringstider: p})
                        })
                    )
            })
        )
    );

    constructor(private tiderService: TiderService, private actions$: Actions<TiderActions.TiderActionsUnion>) {}
}   