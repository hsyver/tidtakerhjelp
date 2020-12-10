import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TiderService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtaker/api";

    getPasseringstider(arrKode: number): Observable<{id: number, startnr: number, tid: string}[]> {
      return this.http.get<{id: number, startnr: number, tid: string}[]>(this.PHP_API_SERVER + '/readPasseringstider.php/?arrKode='+arrKode);
    }

  }