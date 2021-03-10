import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Sexo{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  public formSubmitted = true;

  public userForm = this.formBuilder.group(
    {
    nombre: ['', Validators.required],
    apellidoP: ['', Validators.required],
    apellidoM: ['', Validators.required],
    sexo: ['', Validators.required],
    fechaN: ['', Validators.required],
    telefonoC: [''],
    telefonoM: [''],
    cp: ['']
   }
  )

  sexo: Sexo[] = [
    {value: 'H', viewValue: 'Hombre'},
    {value: 'M', viewValue: 'Mujer'},
    {value: 'X', viewValue: 'Prefiero no decirlo'}
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string): boolean {
    if (this.userForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }


}
