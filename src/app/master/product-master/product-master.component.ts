import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';
import { UnitServiceService } from 'src/app/shared/services/unit-service.service';
import { Category } from 'src/app/shared/models/category.model';
import { Unit } from 'src/app/shared/models/unit.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  productData: Product[] = [];
  categoryData: Category[] = [];
  unitData: Unit[] = [];
  displayColumns: String[] = ["SNo.","Category Name","Product Name","Unit Name","Rate","Discount","Status","Action"]
  productForm = new FormGroup({
    category_id: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    unit_id: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    discount: new FormControl('0'),
    status: new FormControl('1'),
  });
  editProdId:number = 0;
  constructor(
    private categoryService: CategoryServiceService,
    private unitService: UnitServiceService,
    private productService: ProductService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.categoryService.fatchEnableCategoryList().subscribe(res => {
      if (res) {
        this.categoryData = res;
      }
    });
    this.unitService.fatchEnableUnitList().subscribe(res => {
      if (res) {
        this.unitData = res;
      }
    });
    this.fatchData();
  }
  fatchData(){
    this.productService.fatchProductList().subscribe(res => {
      if(res){
        this.productData = res;
      }
    });
  }
  saveData() {
    if (this.productForm.valid) {
      if (this.editProdId == 0) {
        const productData: Product = {
          category_id: this.productForm.get('category_id').value,
          product_name: this.productForm.get('product_name').value,
          unit_id: this.productForm.get('unit_id').value,
          rate: this.productForm.get('rate').value,
          discount: this.productForm.get('discount').value,
          status: this.productForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).login_id
        };
        this.productService.productSave(productData).subscribe(res => {
          if (res) {
            this._snackBar.open("Added Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fatchData();
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
        const productData: Product = {
          product_id: this.editProdId,
          category_id: this.productForm.get('category_id').value,
          product_name: this.productForm.get('product_name').value,
          unit_id: this.productForm.get('unit_id').value,
          rate: this.productForm.get('rate').value,
          discount: this.productForm.get('discount').value,
          status: this.productForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).login_id
        };
        this.productService.updateProduct(productData).subscribe(res => {
          if (res) {
            this._snackBar.open("Updated Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fatchData();
            this.editProdId = 0;
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
  editProduct(data: Product) {
    this.editProdId = data.product_id;
    console.log(data);
    this.productForm.patchValue({
      category_id: data.category_id,
      product_name: data.product_name,
      unit_id: data.unit_id,
      rate: data.rate,
      discount: data.discount,
      status: data.status.toString()
    });
  }

  deleteProduct(data: Product) {
    console.log(data);
    if (confirm("Are You Sure To Delete "+ data.product_name)) {
      const prodId = data.product_id;
      this.productService.deleteProduct(prodId).subscribe(res => {
        if (res) {
          this._snackBar.open("Deleted Successfully!!!","",{
            duration: 2000,
          });
          this.formClear();
          this.fatchData();
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
    this.productForm.patchValue({
      category_id: "",
      product_name: "",
      unit_id: "",
      rate: "",
      discount: "0",
      status: '1'
    });
  }

}
