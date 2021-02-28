import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-messages',
  templateUrl: './warning-messages.component.html',
  styleUrls: ['./warning-messages.component.css']
})
export class WarningMessagesComponent implements OnInit {

  usuario;

  constructor() {
    this.usuario = {
      /*email_validado: false, // Validado true or false*/
      email_validado: true, // Validado true or false
    };
  }

  ngOnInit(): void {
  }

  carcarData(): void {
  }

}
