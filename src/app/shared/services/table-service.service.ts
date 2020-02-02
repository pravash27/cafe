import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Table } from '../models/table.model';
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
export class TableServiceService {

  constructor(private http: HttpClient) { }
  saveTable(table: Table): Observable<Table> {
    console.log("Saving...");
    const tableData = Object.assign({}, table);
    return this.http.post<Table>(apiUrl + '/table', tableData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateTable(id: number, table: Table): Observable<Table> {
    console.log("Updating...");
    const tableData = Object.assign({}, table);
    return this.http.patch<Table>(apiUrl + '/table/' + id, tableData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchTableList(): Observable<Table[]> {
    return this.http.get<Table[]>(apiUrl + "/table", httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchEnabledTable(): Observable<Table[]> {
    return this.http.get<Table[]>(apiUrl + "/table/enabled", httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteTable(id: number): Observable<Table> {
    return this.http.delete<Table>(apiUrl + '/table/' + id, httpOptions)
    .pipe(
      retry(1)
    );
  }
}
