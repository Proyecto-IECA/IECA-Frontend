import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  register = false; // (Siempre en falso) Cambia la vista entre el login y el register

  constructor() {
  }

  ngOnInit(): void {
  }

}
