import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,  } from 'rxjs';
import { retry } from 'rxjs/operators';
import { User } from '../models/user.model';
const apiUrl = environment.nodeUrl.dev;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

  loginWithEmailPassword(email: string, password: string): Observable<User> {
    const userData = {
      email,
      password
    };
    return this.http.post<User>(apiUrl + '/auth/login', userData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  getCurrentUserFromDb(): Observable<User> {
    const data: User = JSON.parse(localStorage.getItem('user'));
    const userdata = {
      token: data.token
    };
    return this.http.post<User>(apiUrl + '/auth/checkuser', userdata,httpOptions)
    .pipe(
      retry(1)
    );
  }
}
