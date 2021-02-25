import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesRoutingModule } from '../pages/pages-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeadbarComponent } from './headbar/headbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeadbarComponent,
    FooterComponent,
  ],
  exports: [
    SidebarComponent,
    HeadbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
  ]
})
export class SharedModule { }
