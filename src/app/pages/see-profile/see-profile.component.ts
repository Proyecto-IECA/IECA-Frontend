import { Component, OnInit } from '@angular/core';
import { SeeProfileService } from './see-profile.service';
import { UsuarioI } from '../../models/usuario';
import { AuthResponseI } from '../../models/auth-response';
import { ActivatedRoute } from '@angular/router';
import { ExperienciaLaboralI } from '../../models/experiencia_laboral';
import { ExperienciaAcademicaI } from 'app/models/experiencia_academica';
import { HabilidadI } from '../../models/habilidad';
import { IdiomaI } from 'app/models/idioma';
import { ValorI } from '../../models/valor';
import { PerfilI } from '../../models/perfil';
import { CursoCertificacionI } from '../../models/cursos_certificaciones';

@Component({
  selector: 'app-see-profile',
  templateUrl: './see-profile.component.html',
  styleUrls: ['./see-profile.component.css']
})
export class SeeProfileComponent implements OnInit {


  idUsuario: number;
  usuario: UsuarioI;
  habilidades: HabilidadI[];
  idiomas: IdiomaI[];
  valores: ValorI[];
  perfiles: PerfilI[];
  expLaborales: ExperienciaLaboralI[];
  expAcademicas: ExperienciaAcademicaI[];
  cursoCertificados: CursoCertificacionI[];

  constructor(
    private seeProfileService: SeeProfileService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.idUsuario = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.seeProfileService.getUsuario(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.usuario = resp.data;
      }
    });

    this.seeProfileService.getExpLaboral(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.expLaborales = resp.data;
      }
    });

    this.seeProfileService.getExpAcademica(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.expAcademicas = resp.data;
      }
    });

    this.seeProfileService.getHabilidad(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.habilidades = resp.data;
      }
    });

    this.seeProfileService.getValor(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.valores = resp.data;
      }
    });

    this.seeProfileService.getIdioma(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.idiomas = resp.data;
      }
    });

    this.seeProfileService.getPerfil(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.perfiles = resp.data;
      }
    });

    this.seeProfileService.getCursoCertificado(this.idUsuario).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.cursoCertificados = resp.data;
      }
    });
  }

}
