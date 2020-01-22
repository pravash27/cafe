import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  sidenav: MatSidenav;
  constructor() { }

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
