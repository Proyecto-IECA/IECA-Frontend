import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { HabilidadPostulanteI } from 'app/models/habilidades_postulante';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HabilidadI } from '../../../models/habilidad';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

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
  filteredHabilidad: Observable<HabilidadI[]>;
  listaHabilidades: HabilidadI[];

  selectable = true;
  removable = true;
  addOnBlur = true;
  guardarHabilidad = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('habilidadInput') habilidadInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.readHabilidadesPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.habilidadAux = resp.data;
      }
    });

    this.usuarioService.readHabilidades().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.listaHabilidades = resp.data;
        this.filteredHabilidad = this.habilidadControl.valueChanges.pipe(
          startWith(null),
          map((habilidad: string | null ) => habilidad ? this._filter(habilidad): this.listaHabilidades.slice())
        );
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

  selectedHab(event: MatAutocompleteSelectedEvent): void {
    this.habilidades.push({
      id_postulante: this.usuario.id_postulante,
      descripcion: event.option.viewValue
    });
    this.habilidadInput.nativeElement.value = '';
    this.habilidadControl.setValue(null);
    if (!this.compararArregos(this.habilidades, this.habilidadAux)) {
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

    return this.listaHabilidades.filter(habilidad => habilidad.descripcion.toLowerCase().indexOf(habilidadDescripcion) === 0);
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
