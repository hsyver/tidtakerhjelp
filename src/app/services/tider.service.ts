import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TiderService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtakerhjelpen/api";

    getPasseringstider(arrKode: number): Observable<{id: number, startnr: number, tid: string}[]> {
        return this.http.get<{id: number, startnr: number, tid: string}[]>(this.PHP_API_SERVER + '/readPasseringstider.php/?arrKode='+arrKode);
    }

    updatePasseringstider(startnr: number, passeringstider: string[], arrKode: number) {
        return this.http.put<Object>(this.PHP_API_SERVER + '/updatePasseringstider.php?arrKode='+arrKode+'&startnr='+startnr, {'passeringstider': passeringstider});
    }

    getResultatliste(arrKode: number): Observable<string> {
        return this.http.get<string>(this.PHP_API_SERVER + '/getResultatliste.php/?arrKode='+arrKode);
    }

  }