import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatRadioModule,
  MatTableModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSelectModule
];

const SharedComponents = [
  TitlebarComponent,
  SidenavComponent
];


@NgModule({
  declarations: [
    SharedComponents
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialComponents,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SharedComponents,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponents
  ]

})
export class SharedModule { }
