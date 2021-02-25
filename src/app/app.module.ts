import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SocialMediaComponent } from './auth/components/social-media/social-media.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SocialMediaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    PagesModule,

    AppRoutingModule,
    PagesRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
