import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ValorPostulanteI } from 'app/models/valor_postulante';
import { UsuarioI } from '../../../../models/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValorI } from 'app/models/valor';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  @Input() usuario: UsuarioI 
  selectable = true;
  removable = true;
  guardarValor = false;
  valores: ValorPostulanteI[];
  valoresAux: ValorPostulanteI[];
  valorCtrl = new FormControl();
  filteredValor: Observable<ValorI[]>
  ListaValores: ValorI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

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
        id_postulante: this.usuario.id_usuario,
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
      id_postulante: this.usuario.id_usuario, 
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
            this.doneMassage(resp.message);
            this.valoresAux = resp.data;
          } else {
            this.errorPeticion(resp.message);
          }
        });
        this.guardarValor = false;
      } else {
        this.errorMassage();
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

   //  ---------- MENSAJES ---------- //
   errorServer(error: any): void { // Lo sentimos su petición no puede ser procesada, favor de ponerse en contacto con soporte técnico
    Swal.fire({
      icon: 'error',
      title: 'Petición NO procesada',
      text: `Vuelve a intentar de nuevo...
      Si el error persiste ponerse en contacto con soporte técnico`,
    });
    console.log(error);
  }

  errorMassage(): void {
    Swal.fire({
      icon: 'error',
      title: 'Revisa el formulario',
      text: 'Revisa que el formulario esté correctamente llenado',
      showConfirmButton: false,
      timer: 2700
    });
  }

  doneMassage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Cambios Actualizados',
      text: message,
      showConfirmButton: false,
      timer: 2700
    });
  }

  errorPeticion(error: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
      showConfirmButton: false,
      timer: 2700
    });
  }

}
