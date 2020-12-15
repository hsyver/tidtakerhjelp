import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '../reducers/index';
import * as paameldingActions from '../paameldingsliste/state/paameldingsliste.actions';
import * as opprettActions from '../opprett-arr/state/opprett-arr.actions';
import * as tiderActions from '../tider/state/tider.actions';
import { Observable } from 'rxjs';
import { Paamelding } from '../models/paamelding.model';

@Component({
  selector: 'app-tider',
  templateUrl: './tider.component.html',
  styleUrls: ['./tider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TiderComponent implements OnInit {
  arrKode: number;
  arrNavn$: Observable<string>;
  runderKvinner$: Observable<number>;
  runderMenn$: Observable<number>;
  archived$: Observable<boolean>;

  paameldinger$: Observable<Paamelding[]>;
  passeringstider$: Observable<{id: number, startnr: number, tid: string}[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromRoot.AppState>, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.arrKode = params.arrKode;
      this.store.dispatch(opprettActions.loadArr({arrKode: params.arrKode, routeToPaameldingsliste: false}));
    })

    this.store.dispatch(paameldingActions.LoadPaameldinger({arrKode: this.arrKode}));
    this.store.dispatch(tiderActions.LoadPasseringstider({arrKode: this.arrKode}));
    
    this.error$ = this.store.select(fromRoot.getError);
    this.arrNavn$ = this.store.select(fromRoot.getArrNavn);
    this.runderKvinner$ = this.store.select(fromRoot.getRunderKvinner);
    this.runderMenn$ = this.store.select(fromRoot.getRunderMenn);
    this.paameldinger$ = this.store.select(fromRoot.getPaameldinger);
    this.passeringstider$ = this.store.select(fromRoot.getPasseringstider);
    this.archived$ = this.store.select(fromRoot.getArchived);

  }

  updateStarttid(obj: {id: number, starttid: string}) {
    this.store.dispatch(paameldingActions.UpdateStarttid({id: obj.id, starttid: obj.starttid, arrKode: this.arrKode}))
  }

  updatePasseringstider(obj: {startnr: number, passeringstider: string[]}) {
    this.store.dispatch(tiderActions.UpdatePasseringstider({startnr: obj.startnr, passeringstider: obj.passeringstider, arrKode: this.arrKode}))
  }

}