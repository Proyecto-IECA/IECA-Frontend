import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app.routing';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MatFormFieldModule } from '@angular/material/form-field';




@NgModule({
  declarations: [
    ForgetPasswordComponent,
    NopagesfoundComponent,
    ValidEmailComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
