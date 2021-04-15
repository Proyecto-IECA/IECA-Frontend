import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { AuthComponent } from './auth/auth.component';
import { EmailValidadoGuard } from './guards/email-validado.guard'
import { TokenValidoGuard } from './guards/token-valido.guard';
import { ComponentsRoutingModule } from './components/components-routing.module';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  /*{
    path: '',
    component: PagesComponent,
    canActivate: [TokenValidoGuard, EmailValidadoGuard],
    children: [{
      path: '',
      loadChildren: './pages/pages.module#PagesModule'
    }]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule,
    ComponentsRoutingModule,
    /*BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })*/
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
