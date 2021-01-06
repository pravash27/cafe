import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
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
export class CustomerService {

  constructor(private http: HttpClient) { }
  saveCustomer(customer:Customer): Observable<Customer>{
    const customerData = Object.assign({},customer);
    return this.http.post<Customer>(apiUrl + '/customer',customerData,httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateCustomer(id: number,customer: Customer): Observable<Customer>{
    const customerData = Object.assign({},customer);
    return this.http.patch<Customer>(apiUrl + '/customer/'+id,customerData,httpOptions)
    .pipe(
      retry(1)
    )
  }

  fetchCustomerList(): Observable<Customer[]>{
    return this.http.get<Customer[]>(apiUrl + '/customer',httpOptions)
    .pipe(
      retry(1)
    );
  }

  fetchEnabledCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(apiUrl + '/customer/enabled',httpOptions)
    .pipe(
      retry(1)
    )
  }

  deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(apiUrl + '/customer/' + id, httpOptions)
    .pipe(
      retry(1)
    );
  }

  checkMobile(data): Observable<Customer>{
    const customerData = Object.assign({},data);
    return this.http.post<Customer>(apiUrl + '/customer/checkMobile',customerData,httpOptions)
    .pipe(
      retry(1)
    );
  }
}
