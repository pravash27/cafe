import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Unit } from '../models/unit.model';
import { User } from '../models/user.model';

const apiUrl = environment.nodeUrl.dev;
const userdata: User = JSON.parse(localStorage.getItem('user'));
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": 'token ' + userdata.token
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
    return this.http.post<Unit>(apiUrl + '/unit', unitData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateUnit(id: number, unit: Unit): Observable<Unit> {
    console.log("Updating...");
    const unitData = Object.assign({}, unit);
    return this.http.patch<Unit>(apiUrl + '/unit/' + id, unitData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchUnitList(): Observable<Unit[]> {
    return this.http.get<Unit[]>(apiUrl + "/unit", httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchEnableUnitList(): Observable<Unit[]> {
    return this.http.get<Unit[]>(apiUrl + "/unit/enabled",httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteUnit(id: number): Observable<Unit> {
    return this.http.delete<Unit>(apiUrl + '/unit' + id,httpOptions)
    .pipe(
      retry(1)
    );
  }
}
