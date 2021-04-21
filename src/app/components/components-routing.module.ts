import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ValidEmailComponent } from './valid-email/valid-email.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

const routes: Routes = [
  { path: 'forgetPassword/:id/:token', component: ForgetPasswordComponent },
  { path: 'validarEmail', component: ValidEmailComponent },
  { path: 'validarEmail/:id/:token', component: ValidEmailComponent },
  /*{ path: '**', component: NopagesfoundComponent }*/
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
