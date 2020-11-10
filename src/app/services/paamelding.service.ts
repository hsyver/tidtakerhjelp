import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Medlem } from "../models/medlem.model";
import { Observable } from "rxjs";
import { Paamelding } from "../models/paamelding.model";

@Injectable({
    providedIn: 'root'
  })
  export class PaameldingService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtaker/api";

    getMedlemmer(): Observable<Medlem[]> {
      return this.http.get<Medlem[]>(this.PHP_API_SERVER + '/readMedlemmer.php');
    }

    getPaameldinger(): Observable<Paamelding[]> {
      return this.http.get<Paamelding[]>(this.PHP_API_SERVER + '/readPaameldinger.php');
    }
  }