import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Billing, Payment } from '../models/billing.model';
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
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  savePayment(id:number,data:Payment): Observable<Billing>{
    console.log(data);
    const paymentData = Object.assign({},data);
    return this.http.post<Billing>(apiUrl +'/billing/'+id+'/payment',paymentData,httpOptions)
    .pipe(
      retry(1)
    )
  }
}
