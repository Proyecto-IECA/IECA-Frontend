import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, CanActivate, RouterModule } from '@angular/router';

import { GuardGuard } from '../guards/guard.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    /* canActivate: [GuardGuard], */
    children: [
      { path: 'dashboard', component: DashboardComponent }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
