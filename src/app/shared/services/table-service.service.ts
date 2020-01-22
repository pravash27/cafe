import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Table } from '../models/table.model';

const apiUrl = environment.nodeUrl.dev;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
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
    return this.http.post<Table>(apiUrl + '/savetable/', tableData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateTable(table: Table): Observable<Table> {
    console.log("Updating...");
    const tableData = Object.assign({}, table);
    return this.http.post<Table>(apiUrl + '/updatetable/', tableData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchTableList(): Observable<Table[]> {
    return this.http.get<Table[]>(apiUrl + "/tablelist")
    .pipe(
      retry(1)
    );
  }

  deleteTable(id: number): Observable<Table> {
    return this.http.get<Table>(apiUrl + '/deletetable/' + id)
    .pipe(
      retry(1)
    );
  }
}
