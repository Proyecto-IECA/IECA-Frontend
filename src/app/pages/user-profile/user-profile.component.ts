import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';


export interface Habilidad{
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
