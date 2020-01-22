import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm =  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  login() {
    if (this.loginForm.valid) {
      const loginResult = this.auth.loginWithEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      loginResult.then((user) => {
        if ( user ) {
          this.auth.getCurrentUserFromDb(user.user.uid)
          .subscribe(res => {
              console.log(res);
              if (res[0]) {
                const userData = {
                  uid: user.user.uid,
                  displayName: user.user.displayName,
                  email: user.user.email,
                  login_id: res[0].id,
                  username: res[0].username
                };
                console.log(user.user);
                localStorage.setItem('user', JSON.stringify(userData));
                this.router.navigate(['/dashboard']);
              }
            },
          error => {

            }
          );
        }
      });
    }
  }

  ngOnInit() {
    this.auth.getCurrentUser().then((user) => {
      if (user) {
        this.auth.getCurrentUserFromDb(user.uid)
        .subscribe(res => {
              console.log(res);
              if (res[0]) {
                const userData = {
                  uid: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  login_id: res[0].login_id,
                  username: res[0].username
                };
                localStorage.setItem('user', JSON.stringify(userData));
                this.router.navigate(['/dashboard']);
              }
          },
          error => {

          }
        );
      }
    });
  }
}
