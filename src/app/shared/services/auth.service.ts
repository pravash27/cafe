import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
    private afauth: AngularFireAuth,
    private http: HttpClient
    ) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      this.afauth.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  loginWithEmailPassword(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }

  getCurrentUserFromDb(uid: string): Observable<User> {
    return this.http.get<User>(apiUrl + '/login/' + uid, httpOptions)
    .pipe(
      retry(1)
    );
  }
}
