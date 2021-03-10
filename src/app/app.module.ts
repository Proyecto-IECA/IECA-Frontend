import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { UserProfileComponent } from './pages/user-profile/user-profile.component';
// import { TableListComponent } from './pages/table-list/table-list.component';
// import { TypographyComponent } from './pages/typography/typography.component';
// import { IconsComponent } from './pages/icons/icons.component';
// import { MapsComponent } from './pages/maps/maps.component';
// import { NotificationsComponent } from './pages/notifications/notifications.component';
// import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth/auth.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { SocialMediaComponent } from './auth/social-media/social-media.component';
import { MatInputModule } from '@angular/material/input';
import { ValidEmailComponent } from './auth/valid-email/valid-email.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        MatInputModule
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthComponent,
    ForgetPasswordComponent,
    SocialMediaComponent,
    ValidEmailComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
