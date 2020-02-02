import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { CategoryServiceService } from '../shared/services/category-service.service';
import { Category } from '../shared/models/category.model';
import { Order } from '../shared/models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent implements OnInit {
  productsList: Product[];
  categoryList: Category[];
  tempProductList: Product[];
  productOrder: Order[] = [];
  search: string;
  category: number = 0;
  totalPrice: number = 0;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryServiceService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.fetchProducts();
    this.fetchCategory();
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
    const order: Order = {
      product_id: product.id,
      product_name: product.name,
      quantity: 1,
      rate: product.rate,
      totalprice: product.rate
    };
    const pId = product.id;
    const index = this.productOrder.findIndex(data => {
      return data.product_id == pId;
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
  removeProductFromOrder(product: Order) {
    this.productOrder = this.productOrder.filter(data => {
      return data.product_id != product.product_id;
    });
    this.totalPrice -= product.totalprice;
  }
  
  addQuantity(order: Order) {
    const pId = order.product_id;
    const index = this.productOrder.findIndex(data => {
      return data.product_id == pId;
    });

    this.productOrder[index].quantity++;
    this.productOrder[index].totalprice = this.productOrder[index].quantity * this.productOrder[index].rate;
    this.totalPrice += order.rate;
  }

  removeQuantity(order: Order) {
    const pId = order.product_id;
    const index = this.productOrder.findIndex(data => {
      return data.product_id == pId;
    });
    if (this.productOrder[index].quantity > 1) {
      this.productOrder[index].quantity--;
      this.productOrder[index].totalprice = this.productOrder[index].quantity * this.productOrder[index].rate;
      this.totalPrice -= order.rate;
    } else {
      this._snackBar.open("Sorry Min Quantity Achieved","",{
        duration: 2000,
      });
    }
  }

}
