import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerServiceComponent } from './customer-service.component';
import { KotComponent } from './kot/kot.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';



@NgModule({
  declarations: [CustomerServiceComponent, KotComponent, BillPaymentComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents:[KotComponent,BillPaymentComponent]
})
export class CustomerServiceModule { }
