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
  
    PHP_API_SERVER = "https://langrenn.org.ntnu.no/tidtakerhjelpen/api";

    getMedlemmer(): Observable<Medlem[]> {
      return this.http.get<Medlem[]>(this.PHP_API_SERVER + '/readMedlemmer.php');
    }

    getPaameldinger(arrKode: number): Observable<Paamelding[]> {
      return this.http.get<Paamelding[]>(this.PHP_API_SERVER + '/readPaameldinger.php/?arrKode='+arrKode);
    }

    addPaamelding(paamelding: Paamelding, arrKode: number): Observable<Paamelding> {
      return this.http.post<Paamelding>(this.PHP_API_SERVER + '/addPaamelding.php?arrKode='+arrKode, paamelding)
    }

    deletePaamelding(id: number, arrKode: number): Observable<number> {
      return this.http.delete<number>(this.PHP_API_SERVER + '/deletePaamelding.php?arrKode='+arrKode+'&id='+id)
    }

    updateStarttid(id: number, starttid: string, arrKode: number) {
      return this.http.put<Object>(this.PHP_API_SERVER + '/updateStarttid.php?arrKode='+arrKode+'&id='+id, {'starttid': starttid})
    }

  }