import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfosideComponent } from './infoside/infoside.component'; 
import { OpprettArrComponent } from './opprett-arr/opprett-arr.component';
import { PaameldingslisteComponent } from './paameldingsliste/paameldingsliste.component';
import { TiderComponent } from './tider/tider.component';
import { ResultatlisteComponent } from './resultatliste/resultatliste.component';

const routes: Routes = [
  { path: 'infoside', component: InfosideComponent },
  { path: 'opprett', component: OpprettArrComponent },
  { path: 'paameldingsliste', component: PaameldingslisteComponent },
  { path: 'tider', component: TiderComponent },
  { path: 'resultatliste', component: ResultatlisteComponent},
  { path: '',   redirectTo: '/infoside', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
