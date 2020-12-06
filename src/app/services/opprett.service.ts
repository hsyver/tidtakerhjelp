import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Arrangement } from "../models/arrangement.model";

@Injectable({
    providedIn: 'root'
  })
  export class OpprettService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtaker/api";

    opprettArr(arrangement: Arrangement): Observable<number> {
      return this.http.put<number>(this.PHP_API_SERVER + '/createArr.php', arrangement);
    }
    
    getArr(arrKode: number): Observable<Arrangement> {
      return this.http.get<Arrangement>(this.PHP_API_SERVER + '/getArr.php?arrKode='+arrKode);
    }

  }