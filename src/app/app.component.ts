import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from './shared/services/sidenav.service';
import { AuthService } from './shared/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { GuardsCheckEnd, GuardsCheckStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav", {static: true}) public sidenav: MatSidenav;
  loading: boolean = true;
  constructor(
    private sidenavService: SidenavService,
    private router: Router
  ) {}

  ngOnInit() {
      this.sidenavService.setSidenav(this.sidenav);
      this.router.events.subscribe(e => {
        if(e instanceof GuardsCheckStart){
          this.loading = true;
          console.log("Guard Start");
        }
        if(e instanceof GuardsCheckEnd){
          this.loading = false;
          console.log("Guard End")
        }
      })
  }
}
