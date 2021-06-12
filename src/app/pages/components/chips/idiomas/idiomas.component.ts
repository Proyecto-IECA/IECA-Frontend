import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IdiomaI } from '../../../../models/idioma';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { IdiomasService } from './idiomas.service';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  @Input() idiomas: IdiomaI[];

  selectable = true;
  removable = true;
  guardarIdioma = false;
  idiomasAux: IdiomaI[] = [];
  idiomaCtrl = new FormControl();
  filteredIdioma: Observable<IdiomaI[]>;
  listaIdiomas: IdiomaI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('idiomaInput') idiomaInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;

  constructor(private idiomasService: IdiomasService) { }

  ngOnInit(): void {

    this.idiomasService.getIdiomasUsuario().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.idiomasAux = resp.data;
      }
    });

    this.idiomasService.getIdiomas().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaIdiomas = resp.data;
        this.filteredIdioma = this.idiomaCtrl.valueChanges.pipe(
          startWith(null),
          map((idioma: string | IdiomaI | null) => idioma ?
          this._filter(idioma) : this.listaIdiomas.slice()));
      }
    });

  }

  addIdi(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
      this.idiomas.push({
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

    this.idiomaCtrl.setValue(null);
  }

  removeIdi(idioma: IdiomaI): void {
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

  selectedIdi(event: MatAutocompleteSelectedEvent) : void{
    this.idiomas.push({
      descripcion: event.option.viewValue
    });
    this.idiomaInput.nativeElement.value = '';
    this.idiomaCtrl.setValue(null);

    if (!this.compararArregos(this.idiomas, this.idiomasAux)) {
      this.guardarIdioma = true;
    } else {
      this.guardarIdioma = false;
    } 
  }


  _filter(idioma: string | IdiomaI): IdiomaI[] {
    let idiomaDescripcion = '';
    if(typeof(idioma) == 'string') {
      idiomaDescripcion = idioma.toLowerCase();
    } else {
      idiomaDescripcion = idioma.descripcion.toLowerCase();
    }
    return this.listaIdiomas.filter(idioma => 
      idioma.descripcion.toLowerCase().indexOf(idiomaDescripcion) === 0
    );
  }

  guardarIdiomas() {
    this.guardarIdioma = false;

    this.idiomasService.addIdiomas(this.idiomas).subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.doneMassage("Exito al cargar los idiomas");
          this.idiomasAux = resp.data;
        } else {
          this.guardarIdioma = true;
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
