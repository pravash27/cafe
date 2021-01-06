import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Billing } from '../models/billing.model';

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
export class CustomerOrderService {

  constructor(private http: HttpClient) { }

  saveBill(data): Observable<Billing>{
    const billingData = Object.assign({},data);
    return this.http.post<Billing>(apiUrl +'/billing',billingData,httpOptions)
    .pipe(
      retry(1)
    )
  }
  getBill(id: number): Observable<Billing>{
    return this.http.get<Billing>(apiUrl +'/billing/'+id,httpOptions)
    .pipe(
      retry(1)
    )
  }

  updateBill(id:number,data:Billing): Observable<Billing>{
    const billingData = Object.assign({},data);
    return this.http.patch<Billing>(apiUrl + '/billing/'+id,billingData,httpOptions)
    .pipe(
      retry(1)
    )
  }
}
