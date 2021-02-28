import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { WarningMessagesComponent } from './components/warning-messages/warning-messages.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'validarEmail/:tipo?/:token?', component: WarningMessagesComponent },
  { path: 'forgetPassword/:tipo/:token', component: ForgetPasswordComponent },
  { path: '', pathMatch: 'full', redirectTo: '/auth' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
