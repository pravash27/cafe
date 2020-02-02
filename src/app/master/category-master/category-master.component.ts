import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';
import { Category } from 'src/app/shared/models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.scss']
})
export class CategoryMasterComponent implements OnInit {
  displayColumns: string[] = ['SNo.', 'Category Name', 'Status', 'Action'];
  categoryData: Category[] = [];
  //dataSource = new MatTableDataSource<Category>();
  editCatId: number = 0;
  categoryForm = new FormGroup({
    category_name: new FormControl('', [Validators.required]),
    status: new FormControl('1')
  });
  constructor(
    private categoryService: CategoryServiceService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.fatchData();
  }

  fatchData() {
    this.categoryService.fatchCategoryList().subscribe(res => {
      console.log(typeof res);
      this.categoryData = res;
      //this.dataSource.data = this.categoryData;
    });
  }

  saveData() {
    if (this.categoryForm.valid) {
      if (this.editCatId == 0) {
        const categoryData: Category = {
          name: this.categoryForm.get('category_name').value,
          status: this.categoryForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).id
        };
        this.categoryService.saveCategory(categoryData).subscribe(res => {
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
        const categoryData: Category = {
          name: this.categoryForm.get('category_name').value,
          status: this.categoryForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).id
        };
        this.categoryService.updateCategory(this.editCatId,categoryData).subscribe(res => {
          if (res) {
            this._snackBar.open("Updated Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fatchData();
            this.editCatId = 0;
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

  editCategory(data: Category) {
    this.editCatId = data.id;
    console.log(data);
    this.categoryForm.patchValue({
      category_name: data.name,
      status: data.status.toString()
    });
  }

  deleteCategory(data: Category) {
    console.log(data);
    if (confirm("Are You Sure To Delete "+ data.name)) {
      const categoryId = data.id;
      this.categoryService.deleteCategory(categoryId).subscribe(res => {
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
    this.categoryForm.patchValue({
      category_name: '',
      status: '1'
    });
  }
}
