import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth/auth.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ValidEmailComponent } from './auth/valid-email/valid-email.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes =[
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'validarEmail',
    component: ValidEmailComponent
  },
  {
    path: 'validarEmail/:tipo/:token',
    component: ValidEmailComponent
  },
  {
    path: 'forgetPassword/:tipo/:token',
    component: ForgetPasswordComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    /* canActivate: [GuardGuard], */
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
