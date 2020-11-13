import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers/index';

@Component({
  selector: 'app-infoside',
  templateUrl: './infoside.component.html',
  styleUrls: ['./infoside.component.scss']
})
export class InfosideComponent implements OnInit {
  error$: Observable<String>;
  
  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
    this.error$ = this.store.select(fromRoot.getError);
  }

}
