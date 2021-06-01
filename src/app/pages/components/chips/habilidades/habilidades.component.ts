import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HabilidadI } from '../../../../models/habilidad';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HabilidadesService } from './habilidades.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  
  @Input() habilidades: HabilidadI[];

  selectable = true;
  removable = true;
  guardarHabilidad = false;
  habilidadesAux: HabilidadI[] = [];
  habilidadControl = new FormControl();
  filteredHabilidad: Observable<HabilidadI[]>;
  listaHabilidades: HabilidadI[];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('habilidadInput') habilidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private habilidadesService: HabilidadesService) {}

  ngOnInit(): void {
    
    this.habilidadesService.getHabilidadesUsuario().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.habilidadesAux = resp.data;
      }
    });

    this.habilidadesService.getHabilidades().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaHabilidades = resp.data;
        this.filteredHabilidad = this.habilidadControl.valueChanges.pipe(
          startWith(null),
          map((habilidad: string | HabilidadI | null ) => habilidad ? 
          this._filter(habilidad): this.listaHabilidades.slice())
        );
      }
    });

  }

  addHab(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.habilidades.push({
        descripcion: value.trim()
      });
    }

    if (input) {
      input.value = '';
    }

    this.habilidadControl.setValue(null);

    if (!this.compararArregos(this.habilidades, this.habilidadesAux)) {
      this.guardarHabilidad = true;
    } else {
      this.guardarHabilidad = false;
    }
  }

  removeHab(habilidad: HabilidadI): void {
    const index = this.habilidades.indexOf(habilidad);

    if (index >= 0) {
      this.habilidades.splice(index, 1);
    }

    if (!this.compararArregos(this.habilidades, this.habilidadesAux)) {
      this.guardarHabilidad = true;
    } else {
      this.guardarHabilidad = false;
    }
  }

  selectedHab(event: MatAutocompleteSelectedEvent): void {
    this.habilidades.push({
      descripcion: event.option.viewValue
    });
    this.habilidadInput.nativeElement.value = '';
    this.habilidadControl.setValue(null);

    if (!this.compararArregos(this.habilidades, this.habilidadesAux)) {
      this.guardarHabilidad = true;
    } else {
      this.guardarHabilidad = false;
    }
  }

  _filter(habilidad: string | HabilidadI): HabilidadI[] {
    let habilidadDescripcion = '';
    if(typeof(habilidad) == 'string') {
      habilidadDescripcion = habilidad.toLowerCase();
    } else {
      habilidadDescripcion = habilidad.descripcion.toLowerCase();
    }

    return this.listaHabilidades.filter(habilidad => 
      habilidad.descripcion.toLowerCase().indexOf(habilidadDescripcion) === 0
    );
  }

  guardarHabilidades() {
    this.guardarHabilidad = false;
    this.habilidadesService.addHabilidades(this.habilidades).subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.doneMassage("Exito al cargar las habilidades");
          this.habilidadesAux = resp.data;
        } else {
          this.guardarHabilidad = true;
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
