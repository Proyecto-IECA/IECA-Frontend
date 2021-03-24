import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { IdiomaPostulanteI } from 'app/models/idioma_postulante';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  @Input() usuario: UsuarioI;

  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  idiomas: IdiomaPostulanteI[];
  idiomasAux: IdiomaPostulanteI[];
  guardarIdioma = false;

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
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readIdiomasPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.idiomasAux = resp.data;
      }
    });

    this.idiomas = this.usuario.idiomas_postulante;
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
