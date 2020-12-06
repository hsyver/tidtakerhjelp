import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Startform } from '../models/startform.enum';
import { OpprettArr } from './state/opprett-arr.actions';
import * as fromRoot from '../reducers/index';

@Component({
  selector: 'app-opprett-arr',
  templateUrl: './opprett-arr.component.html',
  styleUrls: ['./opprett-arr.component.scss']
})
export class OpprettArrComponent implements OnInit {

  startform: Startform;
  runderMenn: number = 1;
  runderKvinner: number = 1;

  error$: Observable<String>;

  startforms = [Startform.Intervallstart, Startform.Fellesstart];
  
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.error$ = this.store.select(fromRoot.getError);
  }

  incrementRunder(gender: string, value: number) {
    if (gender === 'M') {
      this.runderMenn += value;
    } else {
      this.runderKvinner += value;
    }
  }

  disableDecrement(value: number): boolean {
    return value <= 1;
  }

  createArr() {
    this.store.dispatch(OpprettArr({arrangement: {arrKode: null, 
                                                  navn: 'Testnavn', 
                                                  dato: null, 
                                                  startform: Startform.Intervallstart, 
                                                  runderMenn: this.runderMenn, 
                                                  runderKvinner: this.runderKvinner} 
                                                }));
  }
}
