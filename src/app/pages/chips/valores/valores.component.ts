import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ValorPostulanteI } from 'app/models/valor_postulante';
import { UsuarioI } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValorI } from 'app/models/valor';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  @Input() usuario: UsuarioI 
  valores: ValorPostulanteI[];
  valoresAux: ValorPostulanteI[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  guardarValor = false;
  
  valorCtrl = new FormControl();
  filteredValor: Observable<ValorI[]>
  ListaValores: ValorI[];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('valorInput') valorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;
  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readValoresPostulante().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.valoresAux = resp.data;
      }
    });

    this.usuarioService.readValores().subscribe((resp: AuthResponseI) => {
      if(resp.status){
        this.ListaValores = resp.data;
        this.filteredValor = this.valorCtrl.valueChanges.pipe(
          startWith(null),
          map((valor: string | ValorI | null) => valor ?
          this._filter(valor) : this.ListaValores.slice()));
      }
    })

    this.valores = this.usuario.valores_postulante;
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

  selectedVal(event: MatAutocompleteSelectedEvent): void{
    this.valores.push({ 
      id_postulante: this.usuario.id_postulante, 
      descripcion: event.option.viewValue
    });
    this.valorInput.nativeElement.value = '';
    this.valorCtrl.setValue(null);

    if (!this.compararArregos(this.valores, this.valoresAux)) {
      this.guardarValor = true;
    } else {
      this.guardarValor = false;
    }

  }

  _filter(valor: string | ValorI): ValorI[] {
    let valorDescripcion = '';
    if(typeof(valor) == 'string') {
      valorDescripcion = valor.toLowerCase();
    } else {
      valorDescripcion = valor.descripcion.toLowerCase();
    }
    return this.ListaValores.filter(valor => 
      valor.descripcion.toLowerCase().indexOf(valorDescripcion) === 0);
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
