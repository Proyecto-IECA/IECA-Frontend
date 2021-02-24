import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ValidatorsService } from '../services/validators.service';
import { AuthService } from '../services/auth.service';

import { EmpresaI } from '../models/empresa';
import { UsuarioI } from '../models/usuario';

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
  part = true; // True - Muestra la 1ra parte del formulario. False - Muestra la 2da parte del formulario
  type = ''; // Dejarlo vacío ''
  loginForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEmpresaForm: FormGroup;

  constructor(private formB: FormBuilder,
              private validators: ValidatorsService,
              private authService: AuthService,
              private router: Router) {
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

  /* Validar formulario */
  formularioNoValido(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      this.part = true;
      return true;
    }
    return false;
  }

  /* Validar password (Sean iguales) */
  validarPassword(form: FormGroup): boolean {
    return form.hasError('noSonIguales') && this.controlNoValid(form, 'password');
  }

  //  ---------- FORMULARIOS ---------- //
  /* Formulario LOGIN */
  loginCreateForm(): void {
    this.loginForm = this.formB.group({
      email: [ localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
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
      password: [, [Validators.required]],
      sexo: [, Validators.required],
      fecha_nacimiento: [, Validators.required],
    },
      {
        validators: [this.validators.ValidarPassword('pass', 'password')],
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
      password: [, [Validators.required]],
    },
      {
        validators: [this.validators.ValidarPassword('pass', 'password')],
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

    /* Asigna los valores del formualrio en una variable llamada data */
    const data = loginForm.value;


    /* Dirigir el tipo de servicio a solicitar */
    if (loginForm.value.type === 'u') {
      /* Servicio de LOGIN para USUARIO */
      this.authService.loginUsuario(data).subscribe(postulante => {
        if (postulante.status) {
          console.log(postulante); // Borrar
          /* If rememberMe TRUE or False */
          if (loginForm.value.rememberMe) {
            localStorage.setItem('email', data.email);
          }

          loginForm.reset();
          this.router.navigateByUrl('/dashboard');
        }
        console.log('Loging Usuario Fallido');
        return;
      });
      loginForm.reset();
      return;
    }
    if (loginForm.value.type === 'e') {
      /* Servicio de LOGIN para EMPRESA */
      this.authService.loginEmpresa(data).subscribe(empresa => {
        if (empresa.status) {
          console.log(empresa); // Borrar
          /* If rememberMe TRUE or False */
          if (loginForm.value.rememberMe) {
            localStorage.setItem('email', data.email);
          }

          loginForm.reset();
          this.router.navigateByUrl('/dashboard');
        }
        console.log('Loging Empresa Fallido');
        return;
      });
    }
  }

  // Registrarse
  registro(form: FormGroup): void {
    /* Asigna los valores del formualrio en una variable llamada data */
    const data = form.value;

    /* Validar formulario */
    if (this.formularioNoValido(data)) {
      return;
    }
    /* Dirigir el tipo de servicio a solicitar */
    if (this.type === 'u') {
      /* Servicio de REGISTRO para USUARIO */
      this.authService.registroUsuario(data).subscribe( postulante => {
        if (postulante.status) {
          console.log(postulante);
          form.reset();
          return; // Cambiar por this.route.navigateByUrl('/dashboard')
        }
        console.log('Registro Usuario Fallido');
        return;
      });
    }
    if (this.type === 'e') {
      // Servicio de REGISTRO para EMPRESA
      this.authService.registroEmpresa(data).subscribe(empresa => {
        if (empresa.status) {
          console.log(empresa);
          form.reset();
          return; // Cambiar por this.route.navigateByUrl('/dashboard')
        }
        console.log('Registro Empresa Fallido');
        return;
      });
    }
  }

}
