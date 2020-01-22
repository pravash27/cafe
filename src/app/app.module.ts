import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CustomerServiceModule } from './customer-service/customer-service.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MasterModule } from './master/master.module';


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
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  HttpClientModule
];

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      ProjectModules,
      AppRoutingModule,
      DependencyModules
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
