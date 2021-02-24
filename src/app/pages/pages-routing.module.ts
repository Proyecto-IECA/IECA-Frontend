import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, CanActivate, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { GuardGuard } from '../guards/guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [GuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
