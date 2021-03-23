import { Component, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UsuarioService } from '../../services/usuario.service';
import { AuthResponseI } from 'app/models/auth-response';
import { UsuarioI } from 'app/models/usuario';
import { ExperienciaLaboralI } from '../../models/experiencia_laboral';
import { ExperienciaAcademicaI } from 'app/models/experiencia_academica';
import { CursoCertificacionI } from '../../models/cursos_certificaciones';
import { PerfilPostulanteI } from 'app/models/perfil_postulante';
import { HabilidadPostulanteI } from '../../models/habilidades_postulante';
import { ValorPostulanteI } from '../../models/valor_postulante';
import { IdiomaPostulanteI } from '../../models/idioma_postulante';

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

 

  habilidades: HabilidadPostulanteI[];
  habilidadAux: HabilidadPostulanteI[];
  guardarHabilidad = false;

  valores: ValorPostulanteI[]= [];
  valoresAux: ValorPostulanteI[];
  guardarValor = false;

  idiomas: IdiomaPostulanteI[];
  idiomasAux: IdiomaPostulanteI[];
  guardarIdioma = false;

  
  
  addHab(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
      this.habilidades.push({
        id_postulante: this.usuario.id_postulante,
        descripcion: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (!this.compararArregos(this.habilidades, this.habilidadAux)) {
      this.guardarHabilidad = true;
    } else {
      this.guardarHabilidad = false;
    }
  }

  addVal(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
      this.valores.push({
        id_postulante: this.usuario.id_postulante,
        descripcion: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (!this.compararArregos(this.valores, this.valoresAux)) {
      this.guardarValor = true;
    } else {
      this.guardarValor = false;
    }
  }

  addIdi(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
      this.idiomas.push({
        id_postulante: this.usuario.id_postulante,
        descripcion: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (!this.compararArregos(this.idiomas, this.idiomasAux)) {
      this.guardarIdioma = true;
    } else {
      this.guardarIdioma = false;
    }
  }

 

  removeHab(habilidad: HabilidadPostulanteI): void {
    const index = this.habilidades.indexOf(habilidad);

    if (index >= 0) {
      this.habilidades.splice(index, 1);
    }

    if (!this.compararArregos(this.habilidades, this.habilidadAux)) {
      this.guardarHabilidad = true;
    } else {
      this.guardarHabilidad = false;
    }
  }

  removeVal(valor: ValorPostulanteI): void {
    const index = this.valores.indexOf(valor);

    if (index >= 0) {
      this.valores.splice(index,1);
    }

    if (!this.compararArregos(this.valores, this.valoresAux)) {
      this.guardarValor = true;
    } else {
      this.guardarValor = false;
    }

  }

  removeIdi(idioma: IdiomaPostulanteI): void {
    const index = this.idiomas.indexOf(idioma);

    if (index >= 0) {
      this.idiomas.splice(index,1);
    }

    if (!this.compararArregos(this.idiomas, this.idiomasAux)) {
      this.guardarIdioma = true;
    } else {
      this.guardarIdioma = false;
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
    });

    

    this.usuarioService.readHabilidadesPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.habilidadAux = resp.data;
      }
    });

    this.usuarioService.readValoresPostulante().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.valoresAux = resp.data;
      }
    });

    this.usuarioService.readIdiomasPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.idiomasAux = resp.data;
      }
    });
    // this.usuarioService.readPerfiles().subscribe((resp: AuthResponseI) => {
    //   if(resp.status) {
    //     this.perfiles = resp.data;
    //   }
    //   console.log(resp.message);
    // })
  }

  loadData() {
    this.nombreCompleto = this.usuario.nombre + ' ' + this.usuario.apellido_paterno + ' ' + this.usuario.apellido_materno;
    this.email = this.usuario.email;
    this.telefono_celular = this.usuario.telefono_celular;
    this.experienciasLaborales = this.usuario.experiencias_laborales;
    this.experienciasAcademicas = this.usuario.experiencias_academicas;
    this.cursosCertificaciones = this.usuario.cursos_certificaciones;
    /* this.perfiles = this.usuario.perfiles_postulante; */
    this.habilidades = this.usuario.habilidades_postulante;
    this.valores = this.usuario.valores_postulante;
    this.idiomas = this.usuario.idiomas_postulante;
  }

  
  guardarHabilidades() {
    this.usuarioService.createHabilidades(this.habilidades).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readHabilidadesPostulante().subscribe((resp: AuthResponseI) => {
          if(resp.status) {
            this.habilidadAux = resp.data;
          }
        });

        this.guardarHabilidad = false;
      }
    })
  }

  guardarValores() {
    this.usuarioService.createValores(this.valores).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readValoresPostulante().subscribe((resp: AuthResponseI) => {
          if (resp.status) {
            this.valoresAux = resp.data;
          }
        });

        this.guardarValor = false;
      }
    })
  }

  guardarIdiomas() {
    this.usuarioService.createIdiomas(this.idiomas).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readIdiomasPostulante().subscribe((resp: AuthResponseI) => {
          if(resp.status) {
            this.idiomasAux = resp.data;
          }
        });

        this.guardarIdioma = false;
      }
    })
  }


  compararArregos(arreglo: any[], arreglo2: any[]) {
    if (arreglo.length != arreglo2.length) return false;
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i].descripcion != arreglo2[i].descripcion) {
        return false;
      }
    }
    return true;
  }
}
