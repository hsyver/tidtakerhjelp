import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from 'rxjs/operators';
import { ResultatlisteService } from '../../services/resultatliste.service'

import * as ResultatlisteActions from './resultatliste.actions';

@Injectable()
export class ResultatlisteEffects {
    loadResultatliste$ = createEffect((): any =>
        this.actions$.pipe(
            ofType('[Resultatliste] Last resultatliste'),
            switchMap((action) => {
                return this.resultatlisteService
                    .getResultatliste(action.arrKode)
                    .pipe(
                        map((res: string) => {
                            return ResultatlisteActions.LoadResultatlisteComplete({resultatliste: res})
                        })
                    )
            })
        )
    );

    constructor(private resultatlisteService: ResultatlisteService, private actions$: Actions<ResultatlisteActions.ResultatlisteActionsUnion>) {}
}   