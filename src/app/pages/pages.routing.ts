import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CreateVacancyComponent } from "./create-vacancy/create-vacancy.component";
import { CompanyProfileComponent } from "./company-profile/company-profile.component";
import { PerfilCompletoGuard } from "../guards/perfil-completo.guard";
import { TokenValidoGuard } from "../guards/token-valido.guard";
import { VacanciesComponent } from "./vacancies/vacancies.component";

import { PagesComponent } from "./pages.component";
import { UpdateVacancieComponent } from "./update-vacancie/update-vacancie.component";
import { PostulateVacancyComponent } from "./postulate-vacancy/postulate-vacancy.component";
import { MyVacanciesComponent } from "./my-vacancies/my-vacancies.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { SeeProfileComponent } from "./see-profile/see-profile.component";
import { MyPostulationsComponent } from "./my-postulations/my-postulations.component";
import { SeeCompanyComponent } from "./see-company/see-company.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { GuardsService } from '../services/guards.service';
import { EmailValidadoGuard } from '../guards/email-validado.guard';
import { PostulationsComponent } from './postulations/postulations.component';
import { NotificationsComponent } from "./notifications/notifications.component";
import { TipoPostulante } from "app/guards/tipo-postulante.guard";
import { TipoEmpresa } from "app/guards/tipo-empresa.guard";

const tipo_usuario = localStorage.getItem("tipo_usuario") || "";
export let ruta = "auth";
if (tipo_usuario == "Postulante") {
    ruta = "vacancies";
}
if (tipo_usuario == "Empresa") {
    ruta = "my-vacancies";
}

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: ruta,
  },

  {
    path: "",
    component: PagesComponent,
    // canActivate: [TokenValidoGuard, EmailValidadoGuard],
    children: [
      // { path: "dashboard", component: DashboardComponent },
      { path: "user-profile", component: UserProfileComponent, canActivate: [TipoPostulante] },
      { path: "company-profile", component: CompanyProfileComponent, canActivate: [TipoEmpresa] },
      { path: "create-vacancie", component: CreateVacancyComponent, canActivate: [TipoEmpresa, PerfilCompletoGuard] },
      { path: "update-vacancie/:id", component: UpdateVacancieComponent, canActivate: [TipoEmpresa, PerfilCompletoGuard] },
      { path: "vacancies", component: VacanciesComponent, canActivate: [TipoPostulante] },
      { path: "my-vacancies", component: MyVacanciesComponent, canActivate: [TipoEmpresa] },
      { path: "postulate-vacancy/:id", component: PostulateVacancyComponent, canActivate: [TipoPostulante]},
      { path: "favorites", component: FavoritesComponent, canActivate: [TipoPostulante] },
      { path: "see-profile/:id", component: SeeProfileComponent, canActivate: [TipoEmpresa] },
      { path: "my-postulations", component: MyPostulationsComponent, canActivate: [TipoPostulante] },
      { path: "see-company/:id", component: SeeCompanyComponent, canActivate: [TipoPostulante]},
      // { path: "reviews", component: ReviewsComponent },
      { path: "postulations/:id/:tipo", component: PostulationsComponent, canActivate: [TipoEmpresa]},
      { path: "notifications", component: NotificationsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {}
