import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PagesRoutingModule } from './pages.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TypographyComponent } from './components/typography/typography.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


import { UserComponent } from 'app/pages/forms/user/user.component';
import { ExperienciaLaboralComponent } from './forms/experiencia-laboral/experiencia-laboral.component';
import { ExperienciaAcademicaComponent } from 'app/pages/forms/experiencia-academica/experiencia-academica.component';
import { CursoCertificacionComponent } from 'app/pages/forms/curso-certificacion/curso-certificacion.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { PerfilesComponent } from './chips/perfiles/perfiles.component';
import { HabilidadesComponent } from './chips/habilidades/habilidades.component';
import { ValoresComponent } from './chips/valores/valores.component';
import { IdiomasComponent } from './chips/idiomas/idiomas.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        UserComponent,
        ExperienciaLaboralComponent,
        ExperienciaAcademicaComponent,
        CursoCertificacionComponent,
        CompanyProfileComponent,
        CreateVacancyComponent,
        PerfilesComponent,
        HabilidadesComponent,
        ValoresComponent,
        IdiomasComponent,
        VacanciesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        MaterialModule,
    ]
})

export class PagesModule {
}
