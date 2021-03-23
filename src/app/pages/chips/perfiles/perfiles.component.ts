import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { PerfilPostulanteI } from 'app/models/perfil_postulante';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  @Input() usuario: UsuarioI;
  perfiles: PerfilPostulanteI[];
  perfilesAux: PerfilPostulanteI[];
  guardarPerfil = false;

  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  addPer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
    if ((value || '').trim()) {
      this.perfiles.push({ 
        id_postulante: this.usuario.id_postulante, 
        descripcion: value.trim()
      });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    
    if (!this.compararArregos(this.perfiles, this.perfilesAux)) {
      this.guardarPerfil = true;
    } else {
      this.guardarPerfil = false;
    }
  }
  removePer(perfiles: PerfilPostulanteI): void {
    const index = this.perfiles.indexOf(perfiles);

    if (index >= 0) {
      this.perfiles.splice(index, 1);
    }

    if (!this.compararArregos(this.perfiles, this.perfilesAux)) {
      this.guardarPerfil = true;
    } else {
      this.guardarPerfil = false;
    }
  }
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readPerfilesPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.perfilesAux = resp.data;
      }
    });

    this.perfiles = this.usuario.perfiles_postulante;
  }

  guardarPerfiles() {
    this.usuarioService.createPerfiles(this.perfiles).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readPerfilesPostulante().subscribe((resp: AuthResponseI) => {
          if(resp.status) {
            this.perfilesAux = resp.data;
          }
        });
        
        this.guardarPerfil = false;
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
