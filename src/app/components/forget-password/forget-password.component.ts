import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ValidatorsService } from 'app/services/validators.service';
import Swal from 'sweetalert2';
import { AuthResponseI } from '../../models/auth-response';
import { ComponentsService } from '../components.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  
  //  ---------- VARIABLES ---------- //
  id: number;
  token: string;
  passForm: FormGroup;

  constructor(
    private formB: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private validators: ValidatorsService,
    private authService: AuthService,
    private router: Router,
    private componentService: ComponentsService
  ) { 
    this.id = 0;
    this.token = null;
    this.passCreateForm();
    this.params();
  }

  ngOnInit(): void {
    this.params();
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
      this.id = Number(params.id);
      this.token = params.token;
      console.log('id: ', this.id);
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

    this.componentService.forgotPass(this.id, data).subscribe(
      (resp: AuthResponseI) => {
        if(!resp.status) {
          return this.errorMassage(resp.data);
        } 
        this.passForm.reset();
          this.passwordChange();
          /* Redireccionar al auth */
          this.router.navigateByUrl('/auth');
      },
      ((error) => {
        this.errorServer(error);
      } )
    )
  }
}
