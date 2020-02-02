import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/shared/models/unit.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitServiceService } from 'src/app/shared/services/unit-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.scss']
})
export class UnitMasterComponent implements OnInit {
  displayColumns: string[] = ['SNo.', 'Unit Name', 'Status', 'Action'];
  unitData: Unit[] = [];
  editUnitId: number = 0;
  unitForm = new FormGroup({
    unit_name: new FormControl('', [Validators.required]),
    status: new FormControl('1')
  });
  constructor(private unitService: UnitServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fatchData();
  }

  fatchData() {
    this.unitService.fatchUnitList().subscribe(res => {
      this.unitData = res;
      //this.dataSource.data = this.unitData;
    });
  }

  saveData() {
    if (this.unitForm.valid) {
      const unitData: Unit = {
        name: this.unitForm.get('unit_name').value,
        status: this.unitForm.get('status').value,
        loginid: JSON.parse(localStorage.getItem('user')).login_id
      };
      if (this.editUnitId == 0) {
        this.unitService.saveUnit(unitData).subscribe(res => {
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
        this.unitService.updateUnit(this.editUnitId, unitData).subscribe(res => {
          if (res) {
            this._snackBar.open("Updated Successfully!!!","",{
              duration: 2000,
            });
            this.formClear();
            this.fatchData();
            this.editUnitId = 0;
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

  editUnit(data: Unit) {
    this.editUnitId = data.id;
    console.log(data);
    this.unitForm.patchValue({
      unit_name: data.name,
      status: data.status.toString()
    });
  }

  deleteUnit(data: Unit) {
    console.log(data);
    if (confirm("Are You Sure To Delete "+ data.name)) {
      const unitId = data.id;
      this.unitService.deleteUnit(unitId).subscribe(res => {
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
    this.unitForm.patchValue({
      unit_name: '',
      status: '1'
    });
  }
}
