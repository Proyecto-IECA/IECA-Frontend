import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TableListComponent } from '../../pages/table-list/table-list.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { UserComponent } from 'app/pages/forms/user/user.component';
import { ExperienciaLaboralComponent } from '../../pages/forms/experiencia-laboral/experiencia-laboral.component';
import { ExperienciaAcademicaComponent } from 'app/pages/forms/experiencia-academica/experiencia-academica.component';
import { CursoCertificacionComponent } from 'app/pages/forms/curso-certificacion/curso-certificacion.component';
import { CompanyProfileComponent } from '../../pages/company-profile/company-profile.component';
import { CreateVacancyComponent } from '../../pages/create-vacancy/create-vacancy.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTooltipModule,
        MatInputModule,
        MaterialFileInputModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatIconModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatExpansionModule
    ],
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
        CreateVacancyComponent
    ]
})

export class AdminLayoutModule {
}
