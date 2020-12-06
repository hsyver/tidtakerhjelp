import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '../reducers/index';
import * as paameldingActions from '../paameldingsliste/state/paameldingsliste.actions';
import * as opprettActions from '../opprett-arr/state/opprett-arr.actions';
import { Observable } from 'rxjs';
import { Paamelding } from '../models/paamelding.model';

@Component({
  selector: 'app-tider',
  templateUrl: './tider.component.html',
  styleUrls: ['./tider.component.scss']
})
export class TiderComponent implements OnInit {
  arrKode: number;
  arrNavn$: Observable<string>;
  archived$: Observable<boolean>;

  paameldinger$: Observable<Paamelding[]>;
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
    
    this.error$ = this.store.select(fromRoot.getError);
    this.arrNavn$ = this.store.select(fromRoot.getArrNavn);
    this.paameldinger$ = this.store.select(fromRoot.getPaameldinger);
    this.archived$ = this.store.select(fromRoot.getArchived);

  }

}
