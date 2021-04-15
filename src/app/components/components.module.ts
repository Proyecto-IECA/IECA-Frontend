import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app.routing';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { ValidEmailComponent } from './valid-email/valid-email.component';




@NgModule({
  declarations: [
    ForgetPasswordComponent,
    NopagesfoundComponent,
    ValidEmailComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
