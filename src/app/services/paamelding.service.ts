import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Medlem } from "../models/medlem.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PaameldingService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtaker/api";

    getMedlemmer(): Observable<Medlem[]> {
      //return [{navn: 'Test Person', kjonn: 'M', medlemsid: 1}, {navn: 'Per Arne Arnesen', kjonn: 'K', medlemsid: 1239}];
      return this.http.get<Medlem[]>(this.PHP_API_SERVER + '/read.php');
    }
  }