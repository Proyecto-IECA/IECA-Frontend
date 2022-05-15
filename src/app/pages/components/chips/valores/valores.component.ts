import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ValorI } from 'app/models/valor';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ValoresService } from './valores.service';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  @Input() valores: ValorI[];

  selectable = true;
  removable = true;
  guardarValor = false;
  valoresAux: ValorI[] = [];
  valorCtrl = new FormControl();
  filteredValor: Observable<ValorI[]>
  listaValores: ValorI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('valorInput') valorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;
  
  constructor(private valoresService: ValoresService) { }

  ngOnInit(): void {

    this.valoresService.getValoresUsuario().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.valoresAux = resp.data;
      }
    });

    this.valoresService.getValores().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaValores = resp.data;
        this.filteredValor = this.valorCtrl.valueChanges.pipe(
          startWith(null),
          map((valor: string | ValorI | null) => valor ?
          this._filter(valor) : this.listaValores.slice()));
      }
    });

  }

  addVal(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
      this.valores.push({
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

  removeVal(valor: ValorI): void {
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
    return this.listaValores.filter(valor => 
      valor.descripcion.toLowerCase().indexOf(valorDescripcion) === 0);
  }

  guardarValores() {
    this.guardarValor = false;

    this.valoresService.addValores(this.valores).subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.doneMassage("Exito al cargar los valores");
          this.valoresAux = resp.data;
        } else {
          this.guardarValor = true;
          this.errorPeticion(resp.data);
        }
      }, (err) => this.errorServer(err)
    );
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
      title: 'Petición no procesada',
      text: `Vuelve a intentar de nuevo.
      Si el error persiste, comuníquese con el soporte técnico.`,
    });
    console.log(error);
  }

  errorMassage(): void {
    Swal.fire({
      icon: 'error',
      title: 'Verifica el formulario',
      text: 'Verifica que el formulario este completo.',
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
