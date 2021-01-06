import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Customer } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/shared/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  displayColumns: string[] = ['SNo.', 'Customer Name', 'Mobile No.', 'Address', 'Status', 'Action'];
  customerData: Customer[] = [];
  editCustId: number = 0;
  uniqueMobile: boolean = true;
  customerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9]{10}$")]),
    address: new FormControl(''),
    status: new FormControl('1')
  })
  constructor(
    private customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.customerForm.get('mobile').valueChanges.subscribe(m => {
      const data = {
        id: this.editCustId,
        mobile: m
      }
      this.customerService.checkMobile(data).subscribe(c => {
        if(c.status){
          this.uniqueMobile = false
        }else{
          this.uniqueMobile = true;
        }
      })
    })
    this.fetchData();
  }
  fetchData(){
    this.customerService.fetchCustomerList().subscribe(c => {
      this.customerData = c;
    })
  }
  saveData(){
    if(!this.uniqueMobile){
      this._snackBar.open("Mobile No. Already Registered","",{
        duration: 2000,
      });
      return;
    }
    if (this.customerForm.valid) {
      const customerData: Customer = {
        name: this.customerForm.get('name').value,
        mobile: this.customerForm.get('mobile').value,
        address: this.customerForm.get('address').value,
        status: this.customerForm.get('status').value,
        loginid: JSON.parse(localStorage.getItem('user')).login_id
      };
      if (this.editCustId == 0) {
        this.customerService.saveCustomer(customerData).subscribe(res => {
          if (res) {
            this._snackBar.open("Added Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fetchData();
          }
        },
        err => {
          console.log(err);
          if (err.error.code === 'ER_DUP_ENTRY') {
            this._snackBar.open("Data Already Exists!!!","",{
              duration: 2000,
            });
          } else {
            this._snackBar.open("Failed To Add!!!","",{
              duration: 2000,
            });
          }
        });
      } else {
        console.log("Update....");
        this.customerService.updateCustomer(this.editCustId, customerData).subscribe(res => {
          if (res) {
            this._snackBar.open("Updated Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fetchData();
            this.editCustId = 0;
          }
        },
        err => {
          if (err.error.code === 'ER_DUP_ENTRY') {
            this._snackBar.open("Data Already Exists!!!","",{
              duration: 2000,
            });
          } else {
            this._snackBar.open("Failed To Update!!!","",{
              duration: 2000,
            });
          }
        });
      }
    }
  }

  editCustomer(data: Customer) {
    this.editCustId = data.id;
    console.log(data);
    this.customerForm.patchValue({
      name: data.name,
      address: data.address,
      mobile: data.mobile,
      status: data.status.toString()
    });
  }

  deleteCustomer(data: Customer) {
    console.log(data);
    if (confirm("Are You Sure To Delete "+ data.name)) {
      const tableId = data.id;
      this.customerService.deleteCustomer(tableId).subscribe(res => {
        if (res) {
          this._snackBar.open("Deleted Successfully!!!","",{
            duration: 2000,
          });
          this.formClear();
          this.fetchData();
        }
      },
      err => {
        if (err) {
          this._snackBar.open("Failed To Delete!!!","", {
            duration: 2000,
          });
        }
      });
    }
  }

  formClear() {
    this.customerForm.patchValue({
      name: '',
      mobile:'',
      address:'',
      status: '1'
    });
    this.customerForm.get('name').setErrors(null);
    this.customerForm.get('mobile').setErrors(null);
  }
}
