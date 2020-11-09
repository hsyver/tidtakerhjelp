import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import { loadArr } from '../opprett-arr/state/opprett-arr.actions';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>) { }

  ngOnInit(): void {
  }

  doSearch(searchString: number) {
    if ( !searchString ) {
      //return to home
      console.log("ikke gjør noe some helst")
    } else {
      //do the search
      console.log(searchString);
      this.store.dispatch(loadArr({arrKode: searchString}));
    }
  }
}
