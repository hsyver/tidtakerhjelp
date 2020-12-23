import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import { loadArr } from '../opprett-arr/state/opprett-arr.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private store: Store<fromRoot.AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(searchString: number) {
    if ( searchString ) {
      this.router.navigate(['paameldingsliste'], { queryParams: { arrKode: searchString } });
    }
  }
}
