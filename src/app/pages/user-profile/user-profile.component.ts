import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
interface Sexo{
  value: string;
  viewValue: string;
}

interface Mes{
  value: string;
  viewValue: string;
}

export interface Habilidad{
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  sexo: Sexo[] = [
    {value: 'H', viewValue: 'Hombre'},
    {value: 'M', viewValue: 'Mujer'},
    {value: 'X', viewValue: 'Prefiero no decirlo'}
  ]

  meses: Mes[] = [
    {value: 'Enero', viewValue: 'Enero'},
    {value: 'Febrero', viewValue: 'Febrero'},
    {value: 'Marzo', viewValue: 'Marzo'},
    {value: 'Abril', viewValue: 'Abril'},
    {value: 'Mayo', viewValue: 'Mayo'},
    {value: 'Junio', viewValue: 'Junio'},
    {value: 'Julio', viewValue: 'Julio'},
    {value: 'Agosto', viewValue: 'Agosto'},
    {value: 'Septiembre', viewValue: 'Septiembre'},
    {value: 'Octubre', viewValue: 'Octubre'},
    {value: 'Noviembre', viewValue: 'Noviembre'},
    {value: 'Diciembre', viewValue: 'Diciembre'},
  ]
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  habilidades: Habilidad[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our habilidad
    if ((value || '').trim()) {
      this.habilidades.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(habilidad: Habilidad): void {
    const index = this.habilidades.indexOf(habilidad);

    if (index >= 0) {
      this.habilidades.splice(index, 1);
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
