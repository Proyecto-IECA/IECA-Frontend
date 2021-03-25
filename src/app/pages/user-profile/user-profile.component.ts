import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { UsuarioService } from '../../services/usuario.service';
import { AuthResponseI } from 'app/models/auth-response';
import { UsuarioI } from 'app/models/usuario';
import { ExperienciaLaboralI } from '../../models/experiencia_laboral';
import { ExperienciaAcademicaI } from 'app/models/experiencia_academica';
import { CursoCertificacionI } from '../../models/cursos_certificaciones';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public imageForm = this.formBuilder.group(
    {
      foto_perfil: ['']
    }
  )

  usuario: UsuarioI;
  experienciasLaborales: ExperienciaLaboralI[];
  experienciasAcademicas: ExperienciaAcademicaI[];
  cursosCertificaciones: CursoCertificacionI[];
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  panelOpenState = false;
  panelExpL = false;
  panelExpA = false;
  panelCurC = false;

  nombreCompleto = '';
  email = '';
  telefono_celular = '';
  files: any = [];
  foto_perfil = '';
  changeFoto = false;


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
    ) {
   }

  ngOnInit() {
    this.usuarioService.readUsuario().subscribe((resp: AuthResponseI ) => {
      if(resp.status) {
        this.usuario = resp.data;
        this.foto_perfil = this.usuario.foto_perfil;
        this.loadData();
      }
    });

  }
 
  loadData() {
    this.nombreCompleto = this.usuario.nombre + ' ' + this.usuario.apellido_paterno + ' ' + this.usuario.apellido_materno;
    this.email = this.usuario.email;
    this.telefono_celular = this.usuario.telefono_celular;
    this.experienciasLaborales = this.usuario.experiencias_laborales;
    this.experienciasAcademicas = this.usuario.experiencias_academicas;
    this.cursosCertificaciones = this.usuario.cursos_certificaciones;
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

  capturarImage(event) {
    const imageCapturada = event.target.files[0];
    this.extraerBase64(imageCapturada).then((image: any) => {
      this.foto_perfil = image.base;
      this.changeFoto = true;
    });
  }

  extraerBase64 = async($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (error) {
      return null;
    }
  })

  guardarFoto() {
    try {
      this.imageForm.get('foto_perfil').setValue(this.foto_perfil);
      console.log(this.imageForm.value);
      this.usuarioService.updateFoto(this.imageForm.value).subscribe((resp: AuthResponseI) => {
        if(resp.status) {
          console.log("Foto guardada correctamente");
          this.changeFoto = false;
        }
        console.log(resp);
      })

    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
