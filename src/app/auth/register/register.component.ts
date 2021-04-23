import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { ValidatorsService } from '../../services/validators.service';
import { AuthUserService } from '../auth-user.service';
import { AuthResponseI } from 'app/models/auth-response';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css']
})
export class RegisterComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  part = true; // True - Muestra la 1ra parte del formulario. False - Muestra la 2da parte del formulario
  type = ''; // Dejarlo vacío ''
  registerUsuarioForm: FormGroup;
  registerEmpresaForm: FormGroup;
  tipo_usuario: "Postulante";

  @ViewChild('placesRef') placesRef: GooglePlaceDirective; // autocompletar dirección

  constructor(
      private formB: FormBuilder,
      private validators: ValidatorsService,
      /*private authService: AuthService,
      private empresaSvc: EmpresaService,
      private usuarioSvc: UsuarioService,*/
      private router: Router,
      private authUserService: AuthUserService
  ) {
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
          tipo_usuario: [, Validators.required]
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
          tipo_usuario: [, Validators.required]
        },
        {
          validators: [this.validators.ValidarPassword('pass', 'password')],
        });
  }

  changeTipo(event) {
    this.tipo_usuario = event;
  }

  //  ---------- MÉTODOS ---------- //
  // Registrarse
  registro(form: FormGroup): void {
    // console.log(form);

    /* Asigna los valores del formualrio en una variable llamada data */
    form.get("tipo_usuario").setValue(this.tipo_usuario);
    const data = form.value;

    /* Validar formulario */
    if (this.formularioNoValido(data)) {
      /* Mensaje de error en Sweetalert2 */
      return this.errorMassage();
    }
      
    this.authUserService.register(data).subscribe(
      (resp: AuthResponseI) => {
        if (!resp.status) {
          return this.errorMassage();
        }
        form.reset();
        return this.emailEnviado();
      },
      ((error) => {
        this.errorServer(error);
      })
    )
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
