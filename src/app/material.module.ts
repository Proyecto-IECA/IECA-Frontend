import { NgModule } from '@angular/core';
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
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from '@angular/material/table';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMomentDateModule,
    MaterialFileInputModule,
    MatTableModule,
    MatCarouselModule,
    MatPaginatorModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMomentDateModule,
    MaterialFileInputModule,
    MatTableModule,
    MatCarouselModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class MaterialModule { }
