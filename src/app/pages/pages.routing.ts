import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TypographyComponent } from './components/typography/typography.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PerfilCompletoGuard } from '../guards/perfil-completo.guard';
import { TokenValidoGuard } from '../guards/token-valido.guard';
import { VacanciesComponent } from './vacancies/vacancies.component';

import { PagesComponent } from './pages.component';
import { UpdateVacancieComponent } from './update-vacancie/update-vacancie.component';
import { PostulateVacancyComponent } from './postulate-vacancy/postulate-vacancy.component';
import { MyVacanciesComponent } from './my-vacancies/my-vacancies.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SeeProfileComponent } from './see-profile/see-profile.component';
import { MyPostulationsComponent } from './my-postulations/my-postulations.component';
import { SeeCompanyComponent } from './see-company/see-company.component';
import { ReviewsComponent } from './reviews/reviews.component';



export const routes: Routes = [
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

    {
        path: '',
        component: PagesComponent,
       /*  canActivate: [TokenValidoGuard], */
        children: [
            { path: 'dashboard',             component: DashboardComponent },
            { path: 'user-profile',          component: UserProfileComponent },
            { path: 'table-list',            component: TableListComponent },
            { path: 'typography',            component: TypographyComponent },
            { path: 'icons',                 component: IconsComponent },
            { path: 'maps',                  component: MapsComponent },
            { path: 'notifications',         component: NotificationsComponent },
            { path: 'upgrade',               component: UpgradeComponent },
            { path: 'company-profile',       component: CompanyProfileComponent },
            { path: 'create-vacancie',       component: CreateVacancyComponent,   /*  canActivate: [PerfilCompletoGuard] */ },
            { path: 'update-vacancie/:id',   component: UpdateVacancieComponent},
            { path: 'vacancies',             component: VacanciesComponent },
            { path: 'my-vacancies',          component: MyVacanciesComponent},
            { path: 'postulate-vacancy/:id', component: PostulateVacancyComponent},
            { path: 'favorites',             component: FavoritesComponent },
            { path: 'see-profile/:id',       component: SeeProfileComponent},
            { path: 'my-postulations',       component: MyPostulationsComponent},
            { path: 'see-company/:id',       component: SeeCompanyComponent },
            { path: 'reviews',               component: ReviewsComponent },
        ]
    },


];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class PagesRoutingModule { }
