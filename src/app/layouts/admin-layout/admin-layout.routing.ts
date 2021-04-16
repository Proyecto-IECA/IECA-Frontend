import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TableListComponent } from '../../pages/table-list/table-list.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CreateVacancyComponent } from '../../pages/create-vacancy/create-vacancy.component';
import { CompanyProfileComponent } from '../../pages/company-profile/company-profile.component';
import { PerfilCompletoGuard } from '../../guards/perfil-completo.guard';
import { TokenValidoGuard } from '../../guards/token-valido.guard';
import { VacanciesComponent } from '../../pages/vacancies/vacancies.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent,      /* canActivate: [TokenValidoGuard]  */},
    { path: 'table-list',     component: TableListComponent,        canActivate: [TokenValidoGuard] },
    { path: 'typography',     component: TypographyComponent,       canActivate: [TokenValidoGuard] },
    { path: 'icons',          component: IconsComponent,            canActivate: [TokenValidoGuard] },
    { path: 'maps',           component: MapsComponent,             canActivate: [TokenValidoGuard] },
    { path: 'notifications',  component: NotificationsComponent,    canActivate: [TokenValidoGuard] },
    { path: 'upgrade',        component: UpgradeComponent,          canActivate: [TokenValidoGuard] },
    { path: 'company-profile', component: CompanyProfileComponent, /*  canActivate: [TokenValidoGuard] */ },
    { path: 'vacante',        component: CreateVacancyComponent,    /* canActivate: [TokenValidoGuard, PerfilCompletoGuard] */ },
    { path: 'vacancies', component: VacanciesComponent}
];
