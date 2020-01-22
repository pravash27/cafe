import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './shared/services/sidenav.service';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav", {static: true}) public sidenav: MatSidenav;
  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService) {}

    ngOnInit() {
      this.sidenavService.setSidenav(this.sidenav);
    }
}
