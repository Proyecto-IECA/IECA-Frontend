import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { HabilidadPostulanteI } from 'app/models/habilidades_postulante';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HabilidadI } from '../../../models/habilidad';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  @Input() usuario: UsuarioI;
  habilidades: HabilidadPostulanteI[];
  habilidadAux: HabilidadPostulanteI[];
  
  habilidadControl = new FormControl();
  filterHabilidades: Observable<HabilidadI[]>;
  listaHabilidades: HabilidadI[];

  selectable = true;
  removable = true;
  addOnBlur = true;
  guardarHabilidad = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readHabilidadesPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.habilidadAux = resp.data;
      }
    });

    this.usuarioService.readHabilidades().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.listaHabilidades = resp.data;
        console.log(this.listaHabilidades);
      }
    })

    this.habilidades = this.usuario.habilidades_postulante;
  }


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

    this.habilidadControl.setValue(null);
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
