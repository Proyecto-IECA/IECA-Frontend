import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { HabilidadesComponent } from './chips/habilidades/habilidades.component';
import { IdiomasComponent } from './chips/idiomas/idiomas.component';
import { PerfilesComponent } from './chips/perfiles/perfiles.component';
import { ValoresComponent } from './chips/valores/valores.component';

import { CursoCertificacionComponent } from './forms/curso-certificacion/curso-certificacion.component';
import { ExperienciaAcademicaComponent } from './forms/experiencia-academica/experiencia-academica.component';
import { ExperienciaLaboralComponent } from './forms/experiencia-laboral/experiencia-laboral.component';
import { SucursalesComponent } from './forms/sucursales/sucursales.component'
import { UserComponent } from './forms/user/user.component';
import { VacanteComponent } from './forms/vacante/vacante.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { CardProfileComponent } from './card-profile/card-profile.component';



@NgModule({
  declarations: [
    HabilidadesComponent,
    IdiomasComponent,
    PerfilesComponent,
    ValoresComponent,
    CursoCertificacionComponent,
    ExperienciaAcademicaComponent,
    ExperienciaLaboralComponent,
    SucursalesComponent,
    UserComponent,
    NotificationsComponent,
    VacanteComponent,
    CardProfileComponent,
  ],
    exports: [
        HabilidadesComponent,
        IdiomasComponent,
        PerfilesComponent,
        ValoresComponent,
        CursoCertificacionComponent,
        ExperienciaAcademicaComponent,
        ExperienciaLaboralComponent,
        SucursalesComponent,
        UserComponent,
        NotificationsComponent,
        VacanteComponent,
        CardProfileComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GooglePlaceModule,
    RouterModule,
  ]
})
export class ComponentsPagesModule { }
