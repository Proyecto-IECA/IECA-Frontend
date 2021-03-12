import { Component, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UsuarioService } from '../../services/usuario.service';
import { AuthResponseI } from 'app/models/auth-response';
import { UsuarioI } from 'app/models/usuario';
import { ExperienciaLaboralI } from '../../models/experiencia_laboral';
import { ExperienciaAcademicaI } from 'app/models/experiencia_academica';
import { CursoCertificacionI } from '../../models/cursos_certificaciones';


export interface Habilidad{
  name: string;
}

export interface Valor{
  name: string;
}
export interface Idioma{
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  usuario: UsuarioI;
  experienciasLaborales: ExperienciaLaboralI[];
  experienciasAcademicas: ExperienciaAcademicaI[];
  cursosCertificaciones: CursoCertificacionI[];
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  panelOpenState = false;

  nombreCompleto = '';
  email = '';
  telefono_celular = '';


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  habilidades: Habilidad[] = [
    {name: 'Pensamiento Crítico'},
    {name: 'Resolución de Problemas'}
  ];

  valores: Valor[]= [
    {name: 'Respeto'},
    {name: 'Responsabilidad'},
  ]

  idiomas: Idioma[]= [
    {name: 'Inglés'},
    {name: 'Frances'}
  ]
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our habilidad
    if ((value || '').trim()) {
      this.habilidades.push({name: value.trim()});
    }

    if ((value || '').trim()) {
      this.valores.push({name: value.trim()});
    }
    if ((value || '').trim()) {
      this.idiomas.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeHab(habilidad: Habilidad): void {
    const index = this.habilidades.indexOf(habilidad);

    if (index >= 0) {
      this.habilidades.splice(index, 1);
    }
  }

  removeVal(valor: Valor): void {
    const index = this.valores.indexOf(valor);

    if (index >= 0) {
      this.valores.splice(index,1);
    }
  }

  removeIdi(idioma: Idioma): void {
    const index = this.idiomas.indexOf(idioma);

    if (index >= 0) {
      this.idiomas.splice(index,1);
    }
  }
  
  constructor(private usuarioService: UsuarioService) {
   }

  ngOnInit() {
    this.usuarioService.readUsuario().subscribe((resp: AuthResponseI ) => {
      if(resp.status) {
        this.usuario = resp.data;
        this.loadData();
      }
    })
  }

  loadData() {
    this.nombreCompleto = this.usuario.nombre + ' ' + this.usuario.apellido_paterno + ' ' + this.usuario.apellido_materno;
    this.email = this.usuario.email;
    this.telefono_celular = this.usuario.telefono_celular;
    this.experienciasLaborales = this.usuario.experiencias_laborales;
    this.experienciasAcademicas = this.usuario.experiencias_academicas;
    this.cursosCertificaciones = this.usuario.cursos_certificaciones;
  }
  
}
