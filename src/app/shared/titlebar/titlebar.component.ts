import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss']
})
export class TitlebarComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit() {
  }
  toggle(){
    this.sidenavService.toggleSidenav();
  }
}
