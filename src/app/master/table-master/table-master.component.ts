import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Table } from 'src/app/shared/models/table.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TableServiceService } from 'src/app/shared/services/table-service.service';

@Component({
  selector: 'app-table-master',
  templateUrl: './table-master.component.html',
  styleUrls: ['./table-master.component.scss']
})
export class TableMasterComponent implements OnInit {
  displayColumns: string[] = ['SNo.', 'Table Name', 'Status', 'Action'];
  tableData: Table[] = [];
  editTabId: number = 0;
  tableForm = new FormGroup({
    table_name: new FormControl('', [Validators.required]),
    status: new FormControl('1')
  });
  constructor(private tableService: TableServiceService , private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fatchData();
  }

  fatchData() {
    this.tableService.fatchTableList().subscribe(res => {
      console.log(typeof res);
      this.tableData = res;
      //this.dataSource.data = this.tableData;
    });
  }

  saveData() {
    if (this.tableForm.valid) {
      if (this.editTabId == 0) {
        const tableData: Table = {
          table_name: this.tableForm.get('table_name').value,
          status: this.tableForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).login_id
        };
        this.tableService.saveTable(tableData).subscribe(res => {
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
        const tableData: Table = {
          table_id: this.editTabId,
          table_name: this.tableForm.get('table_name').value,
          status: this.tableForm.get('status').value,
          loginid: JSON.parse(localStorage.getItem('user')).login_id
        };
        this.tableService.updateTable(tableData).subscribe(res => {
          if (res) {
            this._snackBar.open("Updated Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fatchData();
            this.editTabId = 0;
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

  editTable(data: Table) {
    this.editTabId = data.table_id;
    console.log(data);
    this.tableForm.patchValue({
      table_name: data.table_name,
      status: data.status.toString()
    });
  }

  deleteTable(data: Table) {
    console.log(data);
    if (confirm("Are You Sure To Delete "+ data.table_name)) {
      const tableId = data.table_id;
      this.tableService.deleteTable(tableId).subscribe(res => {
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
    this.tableForm.patchValue({
      table_name: '',
      status: '1'
    });
  }

}
