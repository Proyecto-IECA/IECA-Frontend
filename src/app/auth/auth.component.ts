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
  register = true; // (Siempre en falso) Cambia la vista entre el login y el register
  part = true; // True - Muestra la 1ra parte del formulario. False - Muestra la 2da parte del formulario
  type = 'e'; // Dejarlo vacío ''
  loginForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEmpresaForm: FormGroup;

  constructor(private formB: FormBuilder,
              /*private validator: ValidatorsService,*/
              router: Router) {
    this.loginCreateForm();
    this.registerUsuarioCreateForm();
    this.registerEmpresaCreateForm();
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(form: FormGroup, controlName: string): boolean {
    return form.controls[controlName].errors
      && form.controls[controlName].touched;
  }
  /*loginControlNoValid(controlName: string): boolean {
    // return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
    return this.loginForm.controls[controlName].errors && this.loginForm.controls[controlName].touched;
  }*/

  /* Validar formulario */
  formularioNoValido(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      this.part = true;
      return true;
    }
    return false;
  }

  //  ---------- FORMULARIOS ---------- //
  /* Formulario LOGIN */
  loginCreateForm(): void {
    this.loginForm = this.formB.group({
      email: [, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass: [, [Validators.required, Validators.minLength(6)]],
      type: [ , Validators.required],
      rememberMe: false
    });
  }

  /* Formulario REGISTRO para USUARIO */
  registerUsuarioCreateForm(): void {
    this.registerUsuarioForm = this.formB.group({
      nombre: [, [Validators.required, Validators.minLength(3)]],
      apellido_paterno: [, [Validators.required, Validators.minLength(3)]],
      apellido_materno: [, [Validators.required, Validators.minLength(3)]],
      email: [, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass: [, [Validators.required, Validators.minLength(6)]],
      password: [, [Validators.required, Validators.minLength(6)]],
      sexo: [, Validators.required],
    });
  }

  /* Formulario REGISTRO para EMPRESA */
  registerEmpresaCreateForm(): void {
    this.registerEmpresaForm = this.formB.group({
      nombre: [, [Validators.required, Validators.minLength(3)]],
      administrador: [, [Validators.required, Validators.minLength(3)]],
      giro: [, Validators.required],
      ubicacion: [, [Validators.required, Validators.minLength(5)]],
      email: [, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass: [, [Validators.required, Validators.minLength(6)]],
      password: [, [Validators.required, Validators.minLength(6)]],
    });
  }

  //  ---------- MÉTODOS ---------- //
  // Cambiar el tipo de formulario (Ingresar o registrarte)
  formulario(): void {
    this.register = !this.register;
  }

  // Ingresar
  login(loginForm: FormGroup): void {
    /* Validar formulario */
    if (this.formularioNoValido(loginForm)) {
      return;
    }
    /* Dirigir el tipo de servicio a solicitar */
    if (loginForm.value.type === 'u') {
      // Servicio de LOGIN para USUARIO
      console.log('Loging Usuario');
      loginForm.reset();
      return;
    }
    if (loginForm.value.type === 'e') {
      // Servicio de LOGIN para EMPRESA
      console.log('Loging Empresa');
      loginForm.reset();
      return;
    }
  }

  // Registrarse
  registro(form: FormGroup): void {
    /* Validar formulario */
    if (this.formularioNoValido(form)) {
      return;
    }
    /* Dirigir el tipo de servicio a solicitar */
    if (this.type === 'u') {
      // Servicio de REGISTRO para USUARIO
      console.log('Registro Usuario');
      form.reset();
      return;
    }
    if (this.type === 'e') {
      // Servicio de REGISTRO para EMPRESA
      console.log('Registro Empresa');
      form.reset();
      return;
    }
  }

}
