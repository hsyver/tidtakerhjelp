import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { InfosideComponent } from './infoside/infoside.component';
import { OpprettArrComponent } from './opprett-arr/opprett-arr.component';
import { PaameldingslisteComponent } from './paameldingsliste/paameldingsliste.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { OpprettArrEffects } from './opprett-arr/state/opprett-arr.effect';
import { PaameldingslisteEffects } from './paameldingsliste/state/paameldingsliste.effect';
import { PaameldingComponent } from './paameldingsliste/paamelding/paamelding.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { TiderComponent } from './tider/tider.component';
import { TidComponent } from './tider/tid/tid.component';
import { TiderEffects } from './tider/state/tider.effects';
import { ResultatlisteComponent } from './resultatliste/resultatliste.component';
import { ResultatlisteEffects } from './resultatliste/state/resultatliste.effects';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    InfosideComponent,
    OpprettArrComponent,
    PaameldingslisteComponent,
    PaameldingComponent,
    TiderComponent,
    TidComponent,
    ResultatlisteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, OpprettArrEffects, PaameldingslisteEffects, TiderEffects, ResultatlisteEffects]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
