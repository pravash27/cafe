import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Unit } from '../models/unit.model';

const apiUrl = environment.nodeUrl.dev;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  })
};
@Injectable({
  providedIn: 'root'
})
export class UnitServiceService {

  constructor(private http: HttpClient) { }
  
  saveUnit(unit: Unit): Observable<Unit> {
    console.log("Saving...");
    const unitData = Object.assign({}, unit);
    return this.http.post<Unit>(apiUrl + '/saveunit/', unitData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateUnit(unit: Unit): Observable<Unit> {
    console.log("Updating...");
    const unitData = Object.assign({}, unit);
    return this.http.post<Unit>(apiUrl + '/updateunit/', unitData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchUnitList(): Observable<Unit[]> {
    return this.http.get<Unit[]>(apiUrl + "/unitlist")
    .pipe(
      retry(1)
    );
  }

  fatchEnableUnitList(): Observable<Unit[]> {
    return this.http.get<Unit[]>(apiUrl + "/enableunit")
    .pipe(
      retry(1)
    );
  }

  deleteUnit(id: number): Observable<Unit> {
    return this.http.get<Unit>(apiUrl + '/deleteunit/' + id)
    .pipe(
      retry(1)
    );
  }
}
