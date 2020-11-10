import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class OpprettService {
    constructor (private http: HttpClient) {}
  
    PHP_API_SERVER = "https://org.ntnu.no/langrenn/tidtaker/api";

    opprettArr(): Observable<Number> {
      return this.http.get<Number>(this.PHP_API_SERVER + '/createArr.php');
    }
    
  }