import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PagesRoutingModule } from './pages.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MyVacanciesComponent } from './my-vacancies/my-vacancies.component';
import { MaterialModule } from '../material.module';
import { ComponentsPagesModule } from './components/components-pages.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { UpdateVacancieComponent } from './update-vacancie/update-vacancie.component';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        CompanyProfileComponent,
        CreateVacancyComponent,
        VacanciesComponent,
        MyVacanciesComponent,
        UpdateVacancieComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        ComponentsPagesModule,
        MaterialModule,
        GooglePlaceModule,
    ]
})

export class PagesModule {
}
