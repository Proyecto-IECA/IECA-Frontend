import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ValorPostulanteI } from 'app/models/valor_postulante';
import { UsuarioI } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  @Input() usuario: UsuarioI 

  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  valores: ValorPostulanteI[]= [];
  valoresAux: ValorPostulanteI[];
  guardarValor = false;

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

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readValoresPostulante().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.valoresAux = resp.data;
      }
    });

    this.valores = this.usuario.valores_postulante;
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
