import { Component, OnInit } from '@angular/core';
import { EmpresaI } from '../models/empresa';
import { UsuarioI } from '../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../assets/css/auth-style.css']
})
export class AuthComponent implements OnInit {

  //  ---------- OBJETOS ---------- //
  usuario: UsuarioI;
  empresa: EmpresaI;

  //  ---------- VARIABLES ---------- //
  register = false; // (Siempre en falso) Cambia la vista entre el login y el register
  form = true;
  type;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private formB: FormBuilder,
              /*private validator: ValidatorsService,*/
              router: Router) {
    this.type = '';
    this.loginCreateForm();
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name por un metodo */
  loginControlNoValid(controlName: string): boolean {
    // return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
    return this.loginForm.controls[controlName].errors && this.loginForm.controls[controlName].touched;
  }

  //  ---------- FORMULARIOS ---------- //
  /* Formulario LOGIN */
  loginCreateForm(): void {
    this.loginForm = this.formB.group({
      email: [, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass: [, [Validators.required, Validators.minLength(6)]],
      type: [ , Validators.required],
      rememberMe: [false]
    });
  }

  /* Formulario REGISTRO */
  registerCreateForm(): void {
    this.registerForm = this.formB.group({});
  }

  //  ---------- MÉTODOS ---------- //
  // Cambiar el tipo de formulario (Ingresar o registrarte)
  formulario(): void {
    this.register = !this.register;
  }

  // Revisa que metodo (login o registro) se va a usar y el tipo (usuario o empresa)


  // Ingresar
  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.loginForm.value.type === 'u') {
      // Servicio de LOGIN para USUARIO
      console.log('Loging Usuario');
      this.loginForm.reset();
    }
    else {
      // Servicio de LOGIN para EMPRESA
      console.log('Loging Empresa');
      this.loginForm.reset();
    }
  }

  // Registrarse
  registro(): void {
  }

}
