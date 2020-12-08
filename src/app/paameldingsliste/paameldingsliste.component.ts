import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Medlem } from '../models/medlem.model';
import * as paameldingActions from './state/paameldingsliste.actions';
import * as opprettActions from '../opprett-arr/state/opprett-arr.actions';

import { Observable } from 'rxjs';
import * as fromRoot from '../reducers/index';
import { map } from 'rxjs/operators';
import { Paamelding } from '../models/paamelding.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paameldingsliste',
  templateUrl: './paameldingsliste.component.html',
  styleUrls: ['./paameldingsliste.component.scss']
})
export class PaameldingslisteComponent implements OnInit {
  @ViewChild("startnr") startnrField: ElementRef;
  @ViewChild("navn") navnField: ElementRef;
  arrKode: number;
  arrNavn$: Observable<string>;
  archived$: Observable<boolean>;

  medlemmer$: Observable<Medlem[]>;
  paameldinger$: Observable<Paamelding[]>;
  error$: Observable<String>;

  navnInput: string;
  kjonnInput: string;
  startnrInput: number;
  medlemInput: Medlem;
  
  filteredMedlemmer;

  constructor(private store: Store<fromRoot.AppState>, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.arrKode = params.arrKode;
      this.store.dispatch(opprettActions.loadArr({arrKode: params.arrKode, routeToPaameldingsliste: true}));
    })
    
    this.store.dispatch(paameldingActions.LoadPaameldinger({arrKode: this.arrKode}));
    this.store.dispatch(paameldingActions.LoadMedlemmer());
    
    this.error$ = this.store.select(fromRoot.getError);
    this.arrNavn$ = this.store.select(fromRoot.getArrNavn);
    this.medlemmer$ = this.store.select(fromRoot.getMedlemmer);
    this.paameldinger$ = this.store.select(fromRoot.getPaameldinger);
    this.archived$ = this.store.select(fromRoot.getArchived);
  }

  applyFilter(event: string) {
    event = event + '';
    this.filteredMedlemmer = this._filter(event);
  }

  private _filter(value: string): Observable<Medlem[]> {
    const filterValue = value.toLowerCase();
    if ( !value ) {
      return null;
    }
    return this.medlemmer$.pipe(
      map((medlem: Medlem[]) => medlem.filter(m => this._nameStartsWith(m.navn, filterValue)))
    );
  }

  private _nameStartsWith(name: string, value: string): boolean {
    let names = name.split(' ');
    names.push(name);
    for (let n of names) {
      if ( n.toLowerCase().startsWith(value) ) {
        return true;
      }
    }
    
    return false;
  }

  clear() {
    this.navnInput = '';
    if ( this.medlemInput ) {
      this.kjonnInput = '';
      this.medlemInput = null;
    }
  }

  selectMedlem(medlem: Medlem) {
    this.navnInput = '';
    this.kjonnInput = medlem.kjonn == 'kvinne' ? 'K' : 'M' 
    this.medlemInput = medlem;
    this.startnrField.nativeElement.focus();
  }

  addPaamelding() {
    let medlemsid = null;
    if ( this.medlemInput ) {
      this.navnInput = this.medlemInput.navn;
      medlemsid = this.medlemInput.medlemsid;
    }

    this.store.dispatch(paameldingActions.AddPaamelding({paamelding: {id: null, startnr: this.startnrInput, starttid: null, medlem: {medlemsid: medlemsid, navn: this.navnInput, kjonn: this.kjonnInput}}, arrKode: this.arrKode}));

    console.log(this.startnrInput, this.medlemInput);

    this.navnInput = '';
    this.kjonnInput = '';
    this.startnrInput = null;
    this.medlemInput = null;

    this.navnField.nativeElement.focus();
  }

  deletePaamelding(id: number) {
    this.store.dispatch(paameldingActions.DeletePaamelding({id: id, arrKode: this.arrKode}));
  }

  display(): string {
    return '';
  }

}
