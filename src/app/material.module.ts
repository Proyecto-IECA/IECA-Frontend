import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from "@angular/material/table";



@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }
