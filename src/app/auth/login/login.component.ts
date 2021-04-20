import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioService } from '../../services/usuario.service';
import { AuthUserService } from '../../services/auth-user.service';
import { AuthResponseI } from '../../models/auth-response';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  part = true; // True - Muestra la 1ra parte del formulario. False - Muestra la 2da parte del formulario
  type = ''; // Dejarlo vacío ''
  loginForm: FormGroup;

  constructor(
      private formB: FormBuilder,
      private validators: ValidatorsService,
      private authService: AuthService,
      private empresaSvc: EmpresaService,
      private usuarioSvc: UsuarioService,
      private router: Router,
      private authUserService: AuthUserService
  ) {
    this.loginCreateForm();
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

  /* Validar Email para recuperar la contraseña */
  validateEmail(email: string): void {
    this.authService.verificarEmail(email).subscribe(value => {
          console.log(value);
          Swal.close();
          /* Si la respuesta es correcta */
          if (!value.status) {
            /* Mensaje de error, preguntar si quiere intentarlo de nuevo */
            Swal.fire({
              title: 'No encotramos tu correo electrónico',
              text: '¿Quieres volver a intentar?',
              icon: 'question',
              showCancelButton: true,
              cancelButtonText: 'No, gracias!',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, por favor!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.recoverPassword();
              }
            });
            return;
          }
          this.emailEnviado();
          return;
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        });
  }

  //  ---------- MENSAJES ---------- //
  errorServer(error: any): void { // Lo sentimos su petición no puede ser procesada, favor de ponerse en contacto con soporte técnico
    Swal.fire({
      icon: 'error',
      title: 'Petición NO procesada',
      text: `Vuelve a intentar de nuevo...
      Si el error persiste ponerse en contacto con soporte técnico`,
    });
    console.log(error);
  }

  errorMassage(): void {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'Vuelve a intentar de nuevo...',
      showCancelButton: true,
      confirmButtonText: '¿Olvidaste la contraseña?',
      cancelButtonText: 'Intentarlo de nuevo',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.recoverPassword();
      }
    });
  }

  errorMassageLogin(message): void {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: message,
      showCancelButton: true,
      confirmButtonText: '¿Olvidaste la contraseña?',
      cancelButtonText: 'Intentarlo de nuevo',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.recoverPassword();
      }
    });
  }

  emailEnviado(): void {
    Swal.fire({
      icon: 'success',
      title: 'Correo enviado',
      text: 'Favor de revisar su bandeja de entrada o spam',
      showConfirmButton: false,
      timer: 2700
    });
  }

  //  ---------- FORMULARIOS ---------- //
  /* Formulario LOGIN */
  loginCreateForm(): void {
    this.loginForm = this.formB.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      pass: [, [Validators.required, Validators.minLength(6)]],
      type: [, Validators.required],
      rememberMe: false
    });
  }

  // <---------- MÉTODOS ----------> //
  // Ingresar
  login(loginForm: FormGroup): void {
    /* Validar formulario */
    /* if (this.formularioNoValido(loginForm)) {
      Mensaje de error en Sweetalert2
      return this.errorMassage();
    } */

    /* Asigna los valores del formualrio en una variable llamada data */
    const data = loginForm.value;

    this.authUserService.login(data).subscribe(
      (resp: AuthResponseI) => {
        console.log(resp);
        if(!resp.status) {
          return this.errorMassageLogin(resp.data);
        }
        if (loginForm.value.rememberMe) {
          localStorage.setItem('email', data.email);
        }
        loginForm.reset();
        return this.router.navigateByUrl('/dashboard');
      }, ((error) => {
        this.errorServer(error);
      })
    )
  }

  // Recuperar contraseña
  recoverPassword(): void {
    Swal.fire({
      title: '¿Olvidaste tu contraseña?',
      text: 'Escribe tu correo electrónico',
      input: 'email',
      inputPlaceholder: 'ejemplo@swal.com',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Validar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        /* Validamos el correo ingresado */
        Swal.showLoading();
        this.validateEmail(email);
      }
    });
  }

}
