import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { MatSnackBar } from '@angular/material';

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
    private router: Router,
    private snackbar: MatSnackBar
    ) {}

  login() {
    if (this.loginForm.valid) {
      const loginResult = this.auth.loginWithEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe(res => {
        console.log(res);
        if (res) {
          const userData: User = res;
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigate(['/dashboard']);
        }
      },err => {
        if(err.status===404){
          this.snackbar.open("Invalid Email and Password",'',{duration:3000})
        }
      });
    }
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.auth.getCurrentUserFromDb().subscribe(res => {
        console.log(res);
        if(res.id){
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
