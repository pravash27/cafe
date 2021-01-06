import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { CategoryServiceService } from '../shared/services/category-service.service';
import { Category } from '../shared/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableServiceService } from '../shared/services/table-service.service';
import { Table } from '../shared/models/table.model';
import { Billing, BillItem, Kot } from '../shared/models/billing.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerOrderService } from '../shared/services/customer-order.service';
import { MatDialog } from '@angular/material';
import { KotComponent } from './kot/kot.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  productsList: Product[] = [];
  categoryList: Category[] = [];
  tempProductList: Product[] = [];
  productOrder: BillItem[] = [];
  tables: Table[] = [];
  search: string;
  category: number = 0;
  totalPrice: number = 0;
  billingForm = new FormGroup({
    table: new FormControl('',[Validators.required]),
    date: new FormControl(new Date(),[Validators.required])
  })
  billid:number
  kot:number = 1;
  kotItems: Kot[] = [];
  billing: Billing;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryServiceService,
    private tableService: TableServiceService,
    private customerOrderService :CustomerOrderService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategory();
    this.fetchTables();
  }

  fetchProducts() {
    this.productService.fetchProducts().subscribe(res => {
      this.productsList = res;
      this.tempProductList = res;
    });
  }

  fetchCategory() {
    this.categoryService.fatchEnableCategoryList().subscribe(res => {
      this.categoryList = res;
    });
  }

  fetchTables() {
    this.tableService.getClearedTables().subscribe(res => {
      this.tables = res;
    })
  }

  fetchProductByCategory() {
    this.search = "";
    if (this.category == 0) {
      this.tempProductList = this.productsList;
    } else {
      this.tempProductList = this.productsList.filter(data => {
        return data.category_id == this.category;
      });
    }
  }

  filterProducts() {
    this.tempProductList = this.productsList.filter(data => {
      if(this.category == 0) {
        return data.name.toLowerCase().includes(this.search);
      } else {
        return data.category_id == this.category && data.name.toLowerCase().includes(this.search);
      }
    })
  }

  addProductToOrder(product: Product) {
    const order: BillItem = {
      product_id: product.id,
      product_name: product.name,
      qty: 1,
      rate: product.rate,
      totalamount: product.rate
    };
    const pId = product.id;
    const index = this.productOrder.findIndex(data => {
      return data.product_id == pId && !data.isOrdered;
    });
    if (index == -1) {
      this.productOrder.push(order);
      this.totalPrice += product.rate;
    } else {
      this._snackBar.open("Product Already Added","",{
        duration: 2000,
      });
    }
  }

  removeProductFromOrder(product: BillItem,index:number) {
      this.productOrder = this.productOrder.filter((data,i) => {
        return i != index;
      });
      this.totalPrice -= product.totalamount;
  }

  addQuantity(order: BillItem,index:number,event) {
    if(event && event.target){
      let qty = parseInt(event.target.value);
      qty = !isNaN(qty) && qty > 0 ?qty:1;
      this.productOrder[index].qty = qty;
    }else{
      this.productOrder[index].qty++;
    }

    this.productOrder[index].totalamount = this.productOrder[index].qty * this.productOrder[index].rate;
    console.log(this.productOrder[index]);
    this.setTotalAmount()
  }

  setTotalAmount(){
    this.totalPrice = 0
    this.productOrder.forEach(data => {
      this.totalPrice += data.totalamount;
    });
  }

  removeQuantity(order: BillItem) {
    const pId = order.product_id;
    const index = this.productOrder.findIndex(data => {
      return data.product_id == pId;
    });
    if (this.productOrder[index].qty > 1) {
      this.productOrder[index].qty--;
      this.productOrder[index].totalamount = this.productOrder[index].qty * this.productOrder[index].rate;
      this.totalPrice -= order.rate;
    } else {
      this._snackBar.open("Sorry Min Quantity Achieved","",{
        duration: 2000,
      });
    }
  }

  saveBilling(){
    const billingData = this.getBillingData();
    console.log(JSON.stringify(billingData));
    if(this.billingForm.valid){
      if(!this.billid){
        this.customerOrderService.saveBill(billingData).subscribe(res => {
          if(res && res.id){
            this._snackBar.open("Order Placed Successfully","",{
              duration: 2000,
            });
            this.clearform();
            this.fetchTables();
          }
        },
        err => {
          console.log(err);
          this._snackBar.open("Failed To Place Order","",{
              duration: 2000,
          });
        }
        )
      }else{
        let billItems = billingData.billItems;
        billingData.billItems = billItems.filter(i => !i.isOrdered);
        console.log(billingData);
        this.customerOrderService.updateBill(this.billid,billingData).subscribe(res => {
          if(res && res.id){
            this._snackBar.open("Order Placed Successfully","",{
              duration: 2000,
            });
            this.clearform();
            this.fetchTables();
          }
        },
        err => {
          console.log(err);
          this._snackBar.open("Failed To Place Order","",{
              duration: 2000,
          });
        }
        )
      }

    }else{
      this._snackBar.open("Fill All Required Fields","",{
        duration: 2000,
    });
    }
  }

  getBillingData(){
    const billingData: Billing = {
      table_id: this.billingForm.get('table').value,
      bill_date: new Date(this.billingForm.get('date').value),
      billItems: this.productOrder,
      bill_amount: this.totalPrice
    }
    return billingData
  }

  clearform(){
    this.productOrder = [];
    this.kot = 1;
    this.kotItems = [];
    this.totalPrice = 0;
    this.billingForm.patchValue({
      table:'',
      date: new Date()
    })
    this.billingForm.get('table').setErrors(null);
    this.billingForm.get('date').setErrors(null);
    this.billid = null;
    this.billing = null;
  }

  getBill(table){
    let tableid = table.id;
    this.clearform();
    this.billingForm.get('table').patchValue(tableid)
    this.totalPrice = 0;
    if(table.billing){
      let id  = table.billing.id;
      this.billid = id;
      this.customerOrderService.getBill(id).subscribe(res => {
        if(res){
          const billing:Billing = res;
          let max = 0;
          this.billing = billing;
          this.productOrder = billing.billItems.map(b => {
            b.product_name = b.product.name;
            b.isOrdered = true;
            if(b.kot > max){
              max = b.kot;
            }
            if(this.kotItems[b.kot-1]){
              this.kotItems[b.kot-1].kotItems.push(b);
            }else{
              let kotItem:Kot = {kotNo:b.kot,kotItems:[b]};
              this.kotItems[b.kot-1] = kotItem;
            }
            return b;
          });
          console.log(this.kotItems);
          this.kot = max + 1;
          this.billingForm.get('date').patchValue(new Date(billing.bill_date))
          this.setTotalAmount();
        }
      })
    }
  }

  showKotItems(kotItems: BillItem[]){
    this.dialog.open(KotComponent,{
      width:'400px',
      height:'400px',
      data: kotItems
    })
  }
  addPayment(){
    const dialogRef = this.dialog.open(BillPaymentComponent,{
      width: '500px',
      height:'500px',
      data: this.billing
    });
    dialogRef.afterClosed().subscribe(bill => {
      if(bill && bill.status){
        this.fetchTables();
        this.clearform();
      }
    })
  }
}
