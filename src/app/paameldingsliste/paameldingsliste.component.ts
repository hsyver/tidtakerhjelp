import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Medlem } from '../models/medlem.model';
import * as paameldingActions from './state/paameldingsliste.actions';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers/index';
import { startWith, map, catchError, filter } from 'rxjs/operators';
import { Paamelding } from '../models/paamelding.model';

@Component({
  selector: 'app-paameldingsliste',
  templateUrl: './paameldingsliste.component.html',
  styleUrls: ['./paameldingsliste.component.scss']
})
export class PaameldingslisteComponent implements OnInit {
  @ViewChild("startnr") startnrField: ElementRef;
  @ViewChild("navn") navnField: ElementRef;

  arrKode$: Observable<Number>;
  medlemmer$: Observable<Medlem[]>;
  error$: Observable<String>;

  navnInput: string;
  kjonnInput: string;
  startnrInput: number;
  medlemInput: Medlem;
  
  filteredMedlemmer;
  paameldinger: Paamelding[] = [];
  pid = 1;

  constructor(private store: Store<fromRoot.AppState>) {
    this.error$ = store.select(fromRoot.getError);
  }

  ngOnInit(): void {
    this.store.dispatch(paameldingActions.LoadMedlemmer());
    
    this.medlemmer$ = this.store.select(fromRoot.getMedlemmer);
    this.arrKode$ = this.store.select(fromRoot.getArrKode);
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

    this.paameldinger.push({id: this.pid++, startnr: this.startnrInput, medlem: {medlemsid: medlemsid, navn: this.navnInput, kjonn: this.kjonnInput}})
    this.store.dispatch(paameldingActions.AddPaamelding({paamelding: {id: null, startnr: this.startnrInput, medlem: {medlemsid: medlemsid, navn: this.navnInput, kjonn: this.kjonnInput}}}));

    console.log(this.medlemInput, this.navnInput, this.kjonnInput);

    this.navnInput = '';
    this.kjonnInput = '';
    this.startnrInput = null;
    this.medlemInput = null;

    this.navnField.nativeElement.focus();
  }

  deletePaamelding(id: number) {
    this.paameldinger = this.paameldinger.filter(p => p.id !== id);
    this.store.dispatch(paameldingActions.DeletePaamelding({id: id}));
  }

  display(): string {
    return '';
  }

}
