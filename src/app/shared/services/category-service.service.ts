import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

const apiUrl = environment.nodeUrl.dev;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
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
    return this.http.post<Category>(apiUrl + '/savecategory/', categoryData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  updateCategory(category: Category): Observable<Category> {
    console.log("Updating...");
    const categoryData = Object.assign({}, category);
    return this.http.post<Category>(apiUrl + '/updatecategory/', categoryData, httpOptions)
    .pipe(
      retry(1)
    );
  }

  fatchCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + "/categorylist")
    .pipe(
      retry(1)
    );
  }

  fatchEnableCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl + "/enablecategory")
    .pipe(
      retry(1)
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.get<Category>(apiUrl + '/deletecategory/' + id)
    .pipe(
      retry(1)
    );
  }

}
