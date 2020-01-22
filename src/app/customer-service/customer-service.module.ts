import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerServiceComponent } from './customer-service.component';



@NgModule({
  declarations: [CustomerServiceComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CustomerServiceModule { }
