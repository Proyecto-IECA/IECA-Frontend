import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../assets/css/auth-style.css']
})
export class AuthComponent implements OnInit {

  register = false;

  constructor() { }

  ngOnInit(): void {
  }

}
