import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableMasterComponent } from './table-master/table-master.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { SharedModule } from '../shared/shared.module';
import { UnitMasterComponent } from './unit-master/unit-master.component';



@NgModule({
  declarations: [
    TableMasterComponent,
    CategoryMasterComponent,
    ProductMasterComponent,
    UnitMasterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MasterModule { }
