import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';

interface Sexo{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, DoCheck {

  public selected;
  @Input() usuario: UsuarioI;
  public formSubmitted = true;
  loading = false;

  public userForm = this.formBuilder.group(
    {
    nombre: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    sexo: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    telefono_casa: [''],
    telefono_celular: [''],
    codigo_postal: [''],
    domicilio:[''],
    ciudad:[''],
    pais:['']
   }
  )

  sexo: Sexo[] = [
    {value: 'H', viewValue: 'Hombre'},
    {value: 'M', viewValue: 'Mujer'},
    {value: 'X', viewValue: 'Prefiero no decirlo'}
  ]

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }
  
  ngDoCheck(): void {
    this.loadData(this.usuario);
  }

  ngOnInit(): void {

  }

  campoNoValido(campo: string): boolean {
    if (this.userForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  loadData( usuario: UsuarioI ) {
    this.userForm.reset(usuario);
  }

  imprimir() {
    console.log(this.usuario);
  }



}
