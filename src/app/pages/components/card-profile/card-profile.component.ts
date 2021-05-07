import { Component, Input, OnInit } from '@angular/core';
import { UsuarioI } from '../../../models/usuario';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styles: [`
    .cursor {
      cursor: pointer;
    }
  `]
})
export class CardProfileComponent implements OnInit {

  @Input() profile: UsuarioI;

  constructor() { }

  ngOnInit(): void {
  }

}
