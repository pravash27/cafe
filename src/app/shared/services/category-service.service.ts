import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
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
export class CategoryServiceService {

  constructor(private http: HttpClient) { }

  saveCategory(category: Category): Observable<Category> {
    console.log("Saving...");
    const categoryData = Object.assign({}, category);
    return this.http.post<Category>(apiUrl + '/product-category/', categoryData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    console.log("Updating...");
    const categoryData = Object.assign({}, category);
    return this.http.patch<Category>(apiUrl + '/product-category/' + id, categoryData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + '/product-category', httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchEnableCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + '/product-category/enabled', httpOptions)
    .pipe(
      retry(1)
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(apiUrl + '/product-category/' + id, httpOptions)
    .pipe(
      retry(1)
    );
  }

}
