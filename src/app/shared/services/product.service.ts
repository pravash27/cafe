import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
const apiUrl = environment.nodeUrl.dev;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  productSave(product: Product): Observable<Product> {
    const productData = Object.assign({}, product);
    return this.http.post<Product>(apiUrl + "/saveproduct", productData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const productData = Object.assign({}, product);
    return this.http.post<Product>(apiUrl + "/updateproduct", productData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + "/productlist")
    .pipe(
      retry(1)
    );
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + '/fetchproducts', httpOptions)
    .pipe(
      retry(1)
    );
  }

  productByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl + '/fetchproducts/' + id, httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.get<Product>(apiUrl + "/deleteproduct/" + id)
    .pipe(
      retry(1)
    );
  }
}
