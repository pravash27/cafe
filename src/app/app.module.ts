import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CustomerServiceModule } from './customer-service/customer-service.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MasterModule } from './master/master.module';
import { NgxMomentDateModule } from '@angular-material-components/moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';


const ProjectModules = [
  SharedModule,
  LoginModule,
  CustomerServiceModule,
  DashboardModule,
  MasterModule
];

const DependencyModules = [
  RouterModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule
];
const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "DD-MM-YYYY hh:mm A"
  },
  display: {
    dateInput: "DD-MM-YYYY hh:mm A",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      ProjectModules,
      AppRoutingModule,
      DependencyModules
   ],
   providers: [
      {
        provide: NgxMomentDateModule,
        deps: [MAT_DATE_LOCALE]
      },
      { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
    ],
    bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
