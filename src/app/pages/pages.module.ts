import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PagesRoutingModule } from './pages.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MaterialModule } from '../material.module';
import { ComponentsPagesModule } from './components/components-pages.module';


@NgModule({
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        CompanyProfileComponent,
        CreateVacancyComponent,
        VacanciesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        ComponentsPagesModule,
        MaterialModule,
    ]
})

export class PagesModule {
}
