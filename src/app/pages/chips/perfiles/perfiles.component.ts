import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthResponseI } from 'app/models/auth-response';
import { PerfilPostulanteI } from 'app/models/perfil_postulante';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { PerfilI } from '../../../models/perfil';;
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  @Input() usuario: UsuarioI;
  perfiles: PerfilPostulanteI[];
  perfilesAux: PerfilPostulanteI[];
  guardarPerfil = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  perfilCtrl = new FormControl();
  filteredPerfil: Observable<PerfilI[]>;
  ListaPerfil: PerfilI[];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('perfilInput') perfilInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') MatAutocomplete: MatAutocomplete;

  addPer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

     // Add our fruit
    if ((value || '').trim()) {
      this.perfiles.push({ 
        id_postulante: this.usuario.id_postulante, 
        descripcion: value.trim()
      });
    }
    // Reset the input value
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
  removePer(perfiles: PerfilPostulanteI): void {
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

  selected(event: MatAutocompleteSelectedEvent): void{
    this.perfiles.push({ 
      id_postulante: this.usuario.id_postulante, 
      descripcion: event.option.viewValue
    });
    this.perfilInput.nativeElement.value = '';
    this.perfilCtrl.setValue(null);

  }
  constructor(private usuarioService: UsuarioService) { 
    this.filteredPerfil = this.perfilCtrl.valueChanges.pipe(
      startWith(null),
      map((perfil: PerfilI | null) => perfil ?
      this._filter(perfil.descripcion) : this.ListaPerfil.slice()));
  }

  ngOnInit(): void {
    this.usuarioService.readPerfilesPostulante().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.perfilesAux = resp.data;
      }
    });

    this.perfiles = this.usuario.perfiles_postulante;
  }

  guardarPerfiles() {
    this.usuarioService.createPerfiles(this.perfiles).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.usuarioService.readPerfilesPostulante().subscribe((resp: AuthResponseI) => {
          if(resp.status) {
            this.perfilesAux = resp.data;
          }
        });
        
        this.guardarPerfil = false;
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

  _filter(perfil: string): PerfilI[] {
    const filterValue = perfil.toLowerCase();

    return this.ListaPerfil.filter(perfil => 
      perfil.descripcion.toLowerCase().indexOf(filterValue) ===0);
  }
}
