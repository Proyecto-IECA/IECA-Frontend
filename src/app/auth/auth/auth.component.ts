import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ValidatorsService } from 'app/services/validators.service';

import Swal from 'sweetalert2';

import { EmpresaI } from '../../models/empresa';
import { UsuarioI } from '../../models/usuario';
import { EmpresaService } from '../../services/empresa.service';
import { UsuarioService } from '../../services/usuario.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

   //  ---------- OBJETOS ---------- //
  /*usuario: UsuarioI;
  empresa: EmpresaI;*/
  data: UsuarioI | EmpresaI;

  //  ---------- VARIABLES ---------- //
  register = false; // (Siempre en falso) Cambia la vista entre el login y el register
  part = true; // True - Muestra la 1ra parte del formulario. False - Muestra la 2da parte del formulario
  type = ''; // Dejarlo vacío ''
  loginForm: FormGroup;
  registerUsuarioForm: FormGroup;
  registerEmpresaForm: FormGroup;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective; // autocompletar dirección

  constructor(
    private formB: FormBuilder,
    private validators: ValidatorsService,
    private authService: AuthService,
    private empresaSvc: EmpresaService,
    private usuarioSvc: UsuarioService,
    private router: Router
  ) {
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

  errorMassageLogin(): void {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: 'Correo electrónico y/o contraseña incorrecto',
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
        nombre: [, [Validators.required, Validators.minLength(2)]],
        administrador: [, [Validators.required, Validators.minLength(3)]],
        giro: [, Validators.required],
        ubicacion: [, [Validators.required, Validators.minLength(2)]],
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
      /* Mensaje de error en Sweetalert2 */
      return this.errorMassage();
    }

    /* Asigna los valores del formualrio en una variable llamada data */
    const data = loginForm.value;

    /* Dirigir el tipo de servicio a solicitar */
    if (loginForm.value.type === 'u') {
      /* Servicio de LOGIN para USUARIO */
      this.authService.loginUsuario(data).subscribe(
        postulante => {
          if (!postulante.status) {
            /* Mensaje de error en Sweetalert2 */
            return this.errorMassageLogin();
          }

          /* If rememberMe TRUE or FALSE */
          if (loginForm.value.rememberMe) {
            localStorage.setItem('email', data.email);
          }

          loginForm.reset();
          return this.router.navigateByUrl('/dashboard');
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        });
    }

    if (loginForm.value.type === 'e') {
      /* Servicio de LOGIN para EMPRESA */
      this.authService.loginEmpresa(data).subscribe(
        empresa => {
          if (!empresa.status) {
            /* Mensaje de error en Sweetalert2 */
            return this.errorMassageLogin();
          }
          /* If rememberMe TRUE or False */
          if (loginForm.value.rememberMe) {
            localStorage.setItem('email', data.email);
          }

          loginForm.reset();
          return this.router.navigateByUrl('/dashboard');
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        });
    }
  }

  // Registrarse
  registro(form: FormGroup): void {
    // console.log(form);

    /* Asigna los valores del formualrio en una variable llamada data */
    const data = form.value;

    /* Validar formulario */
    if (this.formularioNoValido(data)) {
      /* Mensaje de error en Sweetalert2 */
      return this.errorMassage();
    }

    /* Dirigir el tipo de servicio a solicitar */
    if (this.type === 'u') {
      /* Servicio de REGISTRO para USUARIO */
      this.authService.registroUsuario(data).subscribe(
        (postulante) => {
          if (!postulante.status) {
            /* Mensaje de error en Sweetalert2 */
            return this.errorMassage();
          }
          form.reset(); // Limpiar fomrulario
          return this.emailEnviado(); // Mendaje de ok
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        });
    }

    /* Dirigir el tipo de servicio a solicitar */
    if (this.type === 'e') {
      // Servicio de REGISTRO para EMPRESA
      this.authService.registroEmpresa(data).subscribe(
        empresa => {
          if (!empresa.status) {
            /* Mensaje de error en Sweetalert2 */
            return this.errorMassage();
          }
          form.reset(); // Limpiar fomrulario
          return this.emailEnviado(); // Mendaje de ok
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        });
    }

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

  // Autocompletar la dirección en la ubicación
  public handleAddressChange(address: Address) {
    // Do some stuff
    // console.log(address);

    // Asignar el valor de google al formulario de registerEmpresaForm
    this.registerEmpresaForm.reset({
      nombre: this.registerEmpresaForm.value.nombre,
      administrador: this.registerEmpresaForm.value.administrador,
      giro: this.registerEmpresaForm.value.giro,
      ubicacion: `${address.name}, ${address.formatted_address}`,
      email: this.registerEmpresaForm.value.email,
      pass: this.registerEmpresaForm.value.pass,
      password: this.registerEmpresaForm.value.password,
    });
  }

}
