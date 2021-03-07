import { Component, OnInit } from '@angular/core';

interface Sexo{
  value: string;
  viewValue: string;
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

  constructor() { }

  ngOnInit() {
  }

}
