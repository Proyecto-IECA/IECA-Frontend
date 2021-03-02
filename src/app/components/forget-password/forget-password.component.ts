import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  tipo: number;
  token: string;
  passForm: FormGroup;

  constructor(private formB: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private validators: ValidatorsService,
              private authService: AuthService,
              private router: Router) {
    this.tipo = 0;
    this.token = null;
    this.passCreateForm();
    this.params();
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(controlName: string): boolean {
    return this.passForm.controls[controlName].errors
      && this.passForm.controls[controlName].touched;
  }

  /* Validar formulario */
  formularioNoValido(form: FormGroup): boolean {
    if (form.invalid) {
      form.markAllAsTouched();
      return true;
    }
    return false;
  }

  /* Validar password (Sean iguales) */
  validarPassword(): boolean {
    return this.passForm.hasError('noSonIguales') && this.controlNoValid('password');
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

  errorMassage(message: string): void {

    // Mensaje
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      text: message
    });
  }

  passwordChange(): void {
    Swal.fire({
      icon: 'success',
      title: 'Contraseña actualizada',
      text: 'Favor de probar tu nueva contraseña',
      showConfirmButton: false,
      timer: 2700
    });
  }


  //  ---------- RECUPERAR PARAMATROS ---------- //
  params(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tipo = Number(params.tipo);
      this.token = params.token;
      console.log('Tipo: ', this.tipo);
      console.log(this.token);
    });
  }

  //  ---------- FORMULARIOS ---------- //
  /* Formulario PASS */
  passCreateForm(): void {
    this.passForm = this.formB.group({
      pass: [, [Validators.required, Validators.minLength(6)]],
      password: [, Validators.required],
    }, {
      validators: [this.validators.ValidarPassword('pass', 'password')],
    });
  }

  /* Metodo para recuperar contraseña */
  forgetPassword(form: FormGroup): void {


    // Extraer los valores del formulario
    const data = form.value;
    console.log(data);

    if (data.pass !== data.password) {
      /* Mensaje de error en Sweetalert2 */
      Swal.fire({
        icon: 'error',
        title: 'Error en contraseñas',
        text: 'Las contraseñas no son iguales'
      });
      return;
    }

    console.log('Tipo: ', this.tipo);
    // Distribuye el flujo para saber si es Postulante o Empresa
    if (this.tipo === 1) {
      // Utilizar el servicio de Auth para recuperar contraseña
      this.authService.renewPasswordUsuario(data, this.token).subscribe(
        postulante => {
          if (!postulante.status) {
            /* Mensaje de error en Sweetalert2 */
            this.errorMassage(postulante.message);
            return;
          }
          this.passForm.reset();
          this.passwordChange();
          /* Redireccionar al auth */
          this.router.navigateByUrl('/auth');
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        }
      );
    }

    // Distribuye el flujo para saber si es Postulante o Empresa
    if (this.tipo === 2) {
      // Utilizar el servicio de Auth para recuperar contraseña
      this.authService.renewPasswordEmpresa(data, this.token).subscribe(
        empresa => {
          console.log(empresa);
          if (!empresa.status) {
            /* Mensaje de error en Sweetalert2 */
            this.errorMassage(empresa.message);
            return;
          }
          this.passForm.reset();
          this.passwordChange();
          /* Redireccionar al auth */
          this.router.navigateByUrl('/auth');
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error);
        }
      );
    }
  }

}
