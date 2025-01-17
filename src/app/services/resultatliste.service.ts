import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ResultatlisteService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://langrenn.org.ntnu.no/tidtakerhjelpen/api";

    getResultatliste(arrKode: number): Observable<string> {
        return this.http.get<string>(this.PHP_API_SERVER + '/getResultatliste.php/?arrKode='+arrKode);
    }

  }