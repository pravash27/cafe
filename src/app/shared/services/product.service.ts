import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { User } from '../models/user.model';
const apiUrl = environment.nodeUrl.dev;
const userdata: User = JSON.parse(localStorage.getItem('user'));
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": 'token ' + userdata.token
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  productSave(product: Product): Observable<Product> {
    const productData = Object.assign({}, product);
    return this.http.post<Product>(apiUrl + "/product", productData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const productData = Object.assign({}, product);
    return this.http.patch<Product>(apiUrl + "/product/" + id, productData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fetchEnabledProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + "/product/enabled", httpOptions)
    .pipe(
      retry(1)
    );
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + '/product', httpOptions)
    .pipe(
      retry(1)
    );
  }

  productByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + '/product/category/' + id, httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.get<Product>(apiUrl + "/product/" + id,httpOptions)
    .pipe(
      retry(1)
    );
  }
}
