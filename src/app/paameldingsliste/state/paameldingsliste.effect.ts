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

    addPaamelding$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Paamelding] Legg til påmelding'),
            switchMap((action) => {
                return this.paameldingService
                    .addPaamelding(action.paamelding, action.arrKode)
                    .pipe(
                        map((p: Paamelding) => {
                            return PaameldingActions.AddPaameldingComplete({paamelding: p})
                        })
                    )
            })
        )
    );

    deletePaamelding$ = createEffect((): any => 
        this.actions$.pipe(
            ofType('[Paamelding] Slett påmelding'),
            switchMap((action) => {
                return this.paameldingService
                .deletePaamelding(action.id, action.arrKode)
                .pipe(
                    map((id: number) => {
                            return PaameldingActions.DeletePaameldingComplete({id: id})
                        })
                    )
            })
        )
    );

    updateStarttime$ = createEffect((): any =>
            this.actions$.pipe(
                ofType('[Tid] Oppdater starttid'),
                switchMap((action) => {
                    return this.paameldingService
                        .updateStarttid(action.id, action.starttid, action.arrKode)
                        .pipe(
                            map(() => {
                                return PaameldingActions.UpdateStarttidComplete({})
                            })
                        )
                })
            )
    );

    constructor(private paameldingService: PaameldingService, private actions$: Actions<PaameldingActions.PaameldingActionsUnion>) {}
}   