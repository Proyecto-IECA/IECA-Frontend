import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { PerfilI } from '../../../../models/perfil';;
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { PerfilesService } from './perfiles.service';
 
@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  @Input() perfiles: PerfilI[];
  @Input() id: number;
  @Input() type: string;

  selectable = true;
  removable = true;
  guardarPerfil = false;
  perfilesAux: PerfilI[] = [];
  perfilCtrl = new FormControl();
  filteredPerfil: Observable<PerfilI[]>;
  ListaPerfiles: PerfilI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
 
  @ViewChild('perfilInput') perfilInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') MatAutocomplete: MatAutocomplete;

  constructor( private perfilesService: PerfilesService ) { }

  ngOnInit(): void {
    if (this.type === "Vacante") {
      this.perfilesService.getPerfilesVacantes(this.id).subscribe(
        (resp: AuthResponseI) => {
          if (resp.status) {
            this.perfilesAux = resp.data;
          }
        }
      )
    } else {
      this.perfilesService.getPerfilesUsuario(this.id).subscribe(
        (resp: AuthResponseI) => {
          if (resp.status) {
            this.perfilesAux = resp.data;
          }
        }
      )
    }
  
    this.perfilesService.getPerfiles().subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.ListaPerfiles = resp.data;
          this.filteredPerfil = this.perfilCtrl.valueChanges.pipe(
            startWith(null),
            map((perfil: string | PerfilI | null) => perfil ?
            this._filter(perfil) : this.ListaPerfiles.slice())
          );
        }
      }
    )


  }

  addPer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    
    if ((value || '').trim()) {
      this.perfiles.push({
        descripcion: value.trim()
      });
    }

    if (input) {
      input.value = '';
    }
    
    if (!this.compararArregos(this.perfiles, this.perfilesAux)) {
      this.guardarPerfil = true;
    } else {
      this.guardarPerfil = false;
    }

    this.perfilCtrl.setValue(null);
  }

  removePer(perfiles: PerfilI): void {
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
  
  selectedPer(event: MatAutocompleteSelectedEvent): void{
    this.perfiles.push({
      descripcion: event.option.viewValue
    });
    this.perfilInput.nativeElement.value = '';
    this.perfilCtrl.setValue(null);

    if (!this.compararArregos(this.perfiles, this.perfilesAux)) {
      this.guardarPerfil = true;
    } else {
      this.guardarPerfil = false;
    }
  }

  _filter(perfil: string | PerfilI): PerfilI[] {
    let perfilDescripcion = '';
    if(typeof(perfil) == 'string') {
      perfilDescripcion = perfil.toLowerCase();
    } else {
      perfilDescripcion = perfil.descripcion.toLowerCase();
    }
    return this.ListaPerfiles.filter(perfil => 
      perfil.descripcion.toLowerCase().indexOf(perfilDescripcion) === 0);
  }
  
  guardarPerfiles()  {
    this.guardarPerfil = false;
    if (this.type === "Vacante") {
      this.perfilesService.addPerfilesVacante(this.id, this.perfiles).subscribe(
        (resp: AuthResponseI) => {
          if (resp.status) {
            this.doneMassage("Exito al cargar los perfiles");
            this.perfilesAux = resp.data;
          } else {
            this.guardarPerfil = true;
            this.errorPeticion(resp.data);
          }
        }, (err) => this.errorServer(err)
      );
    } else {
      this.perfilesService.addPerfilesUsuario(this.id, this.perfiles).subscribe(
        (resp: AuthResponseI) => {
          if (resp.status) {
            this.doneMassage("Exito al cargar los perfiles");
            this.perfilesAux = resp.data;
          } else {
            this.guardarPerfil = true;
            this.errorPeticion(resp.data);

          }
        }, (err) => this.errorServer(err)
      );
    }

    
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
