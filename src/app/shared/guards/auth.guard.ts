import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private auth: AuthService, private afauth: AngularFireAuth, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        // this.auth.getCurrentUser().then(user => {
        //   if (user) {
        //     this.auth.getCurrentUserFromDb(user.uid).subscribe(res => {
        //       if (res[0]) {
        //         resolve(true);
        //       } else {
        //         this.router.navigate(['/login']);
        //         resolve(false);
        //       }
        //     });
        //   } else {
        //     this.router.navigate(['/login']);
        //     resolve(false);
        //   }
        // });
        if (localStorage.getItem('user')) {
          this.auth.getCurrentUserFromDb().subscribe(res => {
            console.log(res);
            if(res.id){
              resolve(true);
            }else{
              this.router.navigate(['/login']);
              resolve(false)
            }
          });
        }else{
          this.router.navigate(['/login']);
          resolve(false)
        }
    });
  }
}
