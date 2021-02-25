import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
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
