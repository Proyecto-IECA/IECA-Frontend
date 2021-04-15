import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

const routes: Routes = [
  { path: 'forgetPassword/:tipo/:token', component: ForgetPasswordComponent },
  { path: 'validarEmail', component: ValidEmailComponent },
  { path: 'validarEmail/:tipo/:token', component: ValidEmailComponent },
  /*{ path: '**', component: NopagesfoundComponent }*/
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
