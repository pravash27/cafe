import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BillItem } from 'src/app/shared/models/billing.model';

@Component({
  selector: 'app-kot',
  templateUrl: './kot.component.html',
  styleUrls: ['./kot.component.scss']
})
export class KotComponent implements OnInit {
  displayColumns: String[] = ["Sno","Product Name","Quantity","Amount"]
  kotItems: BillItem[];
  constructor(
    public dialogRef: MatDialogRef<KotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.kotItems = this.data;
  }
  close() {
    this.dialogRef.close();
  }
}
