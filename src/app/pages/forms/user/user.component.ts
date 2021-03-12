import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioI } from '../../../models/usuario';
import { AuthResponseI } from '../../../models/auth-response';

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

  private usuario: UsuarioI;
  public formSubmitted = true;

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

  ngOnInit(): void {
    this.usuarioService.readUsuario().subscribe((resp: AuthResponseI ) => {
      if(resp.status) {
        this.usuario = resp.data;
        this.loadData(this.usuario);
      }
    })
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


}
