import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { NgxMatNativeDateModule,NgxMatTimepickerModule, NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
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
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgxMatTimepickerModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatMomentModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule,
  MatAutocompleteModule
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
