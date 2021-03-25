import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { IdiomaPostulanteI } from 'app/models/idioma_postulante';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IdiomaI } from '../../../models/idioma';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit {

  @Input() usuario: UsuarioI;
  selectable = true;
  removable = true;
  guardarIdioma = false;
  idiomas: IdiomaPostulanteI[];
  idiomasAux: IdiomaPostulanteI[];
  idiomaCtrl = new FormControl();
  filteredIdioma: Observable<IdiomaI[]>;
  ListaIdiomas: IdiomaI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('idiomaInput') idiomaInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.readIdiomasPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.idiomasAux = resp.data;
      }
    });

    this.usuarioService.readIdiomas().subscribe((resp: AuthResponseI) => {
      if(resp.status){
        this.ListaIdiomas = resp.data;
        this.filteredIdioma = this.idiomaCtrl.valueChanges.pipe(
          startWith(null),
          map((idioma: string | IdiomaI | null) => idioma ?
          this._filter(idioma) : this.ListaIdiomas.slice()));
      } 
    })

    this.idiomas = this.usuario.idiomas_postulante;
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

    this.idiomaCtrl.setValue(null);
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

  selectedIdi(event: MatAutocompleteSelectedEvent) : void{
    this.idiomas.push({
      id_postulante: this.usuario.id_postulante,
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
    return this.ListaIdiomas.filter(idioma => 
      idioma.descripcion.toLowerCase().indexOf(idiomaDescripcion) === 0);
  }

  guardarIdiomas() {
    this.usuarioService.createIdiomas(this.idiomas).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readIdiomasPostulante().subscribe((resp: AuthResponseI) => {
          if(resp.status) {
            this.doneMassage(resp.message);
            this.idiomasAux = resp.data;
          } else {
            this.errorPeticion(resp.message);
          }
        }, (error) => this.errorServer(error));

        this.guardarIdioma = false;
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
