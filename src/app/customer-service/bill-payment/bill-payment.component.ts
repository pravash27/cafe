import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { Billing, Payment } from 'src/app/shared/models/billing.model';
import { Customer } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.scss']
})
export class BillPaymentComponent implements OnInit {
  billing: Billing;
  customers: Customer[];
  displayColumns: String[] = ['Sno','Product Name','Quantity','Amount'];
  paymentForm = new FormGroup({
    date: new FormControl(new Date(),[Validators.required]),
    mobile: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    billamount: new FormControl({value:'',disabled:true},[Validators.required,Validators.min(0)]),
    othercharge: new FormControl('',[Validators.min(0)]),
    totalamount: new FormControl({value:'',disabled:true},[Validators.required,Validators.min(0)]),
    paymode: new FormControl('',[Validators.required])
  })
  filteredCustomers: Customer[]
  constructor(
    public dialogRef: MatDialogRef<BillPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Billing,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.billing = this.data;
    this.getCustomers();
    this.paymentForm.get('mobile').valueChanges.subscribe(res => {
        this.filterCustomers(res);
    })
    this.paymentForm.get('othercharge').valueChanges.subscribe(res => {
      let othercharge = parseFloat(res);
      othercharge = !isNaN(othercharge)?othercharge:0;
      let totalbillamount = this.billing.bill_amount + othercharge
      this.paymentForm.get('totalamount').patchValue(totalbillamount);
    })
    this.paymentForm.get('billamount').patchValue(this.billing.bill_amount);
    this.paymentForm.get('totalamount').patchValue(this.billing.bill_amount);
  }
  filterCustomers(mobile){
    if(typeof mobile === 'string'){
      this.paymentForm.get('name').setValidators([Validators.required])
      this.paymentForm.get('name').patchValue('')
      this.filteredCustomers = this.customers.filter(c => c.mobile.indexOf(mobile)===0)
    }else{
      let customer: Customer = mobile;
      this.paymentForm.get('name').setValidators(null)
      this.paymentForm.patchValue({
        mobile: customer.mobile,
        name: customer.name
      })
    }
  }
  getCustomers(){
    this.customerService.fetchCustomerList().subscribe(res => {
      this.customers = res;
      this.filteredCustomers = this.customers;
    })
  }
  billPayment(){
    if(this.paymentForm.valid){
      let paymentData = this.getPaymentDetails();
      console.log(JSON.stringify(paymentData));
      this.paymentService.savePayment(this.billing.id,paymentData).subscribe(res => {
        if(res){
          this.dialogRef.close({
            bill: res,
            status: true
          })
        }else{
          this.snackBar.open("Failed To Save Payment","",{
            duration:3000
          })
        }
      },err => {
        this.snackBar.open("Failed To Save Payment","",{
          duration:3000
        })
      })
    }else{
      this.snackBar.open("Fill All Details ","",{
        duration:3000
      })
    }
  }
  getPaymentDetails(){
    const paymentData: Payment = {
      paymentDate: new Date(this.paymentForm.get('date').value),
      mobileNo: this.paymentForm.get('mobile').value,
      customer_name: this.paymentForm.get('name').value,
      paidamount:this.paymentForm.get('totalamount').value,
      othercharge: this.paymentForm.get('othercharge').value,
      paymentMode: this.paymentForm.get('paymode').value,
      bill_amount: this.billing.bill_amount
    }
    return paymentData;
  }
  close() {
    this.dialogRef.close();
  }
}
