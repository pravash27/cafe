import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('user')) {
          this.auth.getCurrentUserFromDb().subscribe(res => {
            if(res.id){
              resolve(true);
            }else{
              this.router.navigate(['/login']);
              resolve(false)
            }
          },err => {
            if(err.status===403){
              alert('Token Expired Please Login Again');
            }
            this.router.navigate(['/login']);
            resolve(false)
          });
        }else{
          this.router.navigate(['/login']);
          resolve(false)
        }
    });
  }
}
