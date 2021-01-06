import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerServiceComponent } from '../customer-service/customer-service.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CategoryMasterComponent } from '../master/category-master/category-master.component';
import { ProductMasterComponent } from '../master/product-master/product-master.component';
import { TableMasterComponent } from '../master/table-master/table-master.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UnitMasterComponent } from '../master/unit-master/unit-master.component';
import { CustomerComponent } from '../master/customer/customer.component';

const routes: Routes = [
  { path: 'service', component: CustomerServiceComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'category', component: CategoryMasterComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductMasterComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TableMasterComponent, canActivate: [AuthGuard] },
  { path: 'unit', component: UnitMasterComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
