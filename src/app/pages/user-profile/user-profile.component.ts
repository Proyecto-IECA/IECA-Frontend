import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';


export interface Habilidad{
  name: string;
}

export interface Valor{
  name: string;
}
export interface Idioma{
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  panelOpenState = false;


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  habilidades: Habilidad[] = [
    {name: 'Pensamiento Crítico'},
    {name: 'Resolución de Problemas'}
  ];

  valores: Valor[]= [
    {name: 'Respeto'},
    {name: 'Responsabilidad'},
  ]

  idiomas: Idioma[]= [
    {name: 'Inglés'},
    {name: 'Frances'}
  ]
  
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our habilidad
    if ((value || '').trim()) {
      this.habilidades.push({name: value.trim()});
    }

    if ((value || '').trim()) {
      this.valores.push({name: value.trim()});
    }
    if ((value || '').trim()) {
      this.idiomas.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeHab(habilidad: Habilidad): void {
    const index = this.habilidades.indexOf(habilidad);

    if (index >= 0) {
      this.habilidades.splice(index, 1);
    }
  }

  removeVal(valor: Valor): void {
    const index = this.valores.indexOf(valor);

    if (index >= 0) {
      this.valores.splice(index,1);
    }
  }

  removeIdi(idioma: Idioma): void {
    const index = this.idiomas.indexOf(idioma);

    if (index >= 0) {
      this.idiomas.splice(index,1);
    }
  }
  
  constructor() { }

  ngOnInit() {
  }
  
}
