import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '../reducers/index';
import * as resultatlisteActions from './state/resultatliste.actions';
import * as opprettActions from '../opprett-arr/state/opprett-arr.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultatliste',
  templateUrl: './resultatliste.component.html',
  styleUrls: ['./resultatliste.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ResultatlisteComponent implements OnInit {
  arrKode: number;
  arrNavn$: Observable<string>;
  resultatliste$: Observable<string>;
  error$: Observable<string>;

  constructor(private store: Store<fromRoot.AppState>, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.arrKode = params.arrKode;
      this.store.dispatch(opprettActions.loadArr({arrKode: params.arrKode, routeToPaameldingsliste: false}));
    })

    this.store.dispatch(resultatlisteActions.LoadResultatliste({arrKode: this.arrKode}));
    
    this.error$ = this.store.select(fromRoot.getError);
    this.arrNavn$ = this.store.select(fromRoot.getArrNavn);
    this.resultatliste$ = this.store.select(fromRoot.getResultatliste);
  }

}