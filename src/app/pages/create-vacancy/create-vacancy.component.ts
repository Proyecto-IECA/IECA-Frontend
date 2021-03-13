import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styles: [ `.mt-3 { margin-left: 3px; margin-top: -0.50rem }`
  ]
})
export class CreateVacancyComponent implements OnInit {
  //  ---------- VARIABLES ---------- //
  vacantForm: FormGroup;

  constructor(private formB: FormBuilder,
              private empresaSvc: EmpresaService) {
    this.vacantCreateForm();

    console.log(this.empresaSvc.company);
  }

  ngOnInit(): void {
    this.vacantForm.reset({
      id_empresa: this.empresaSvc.company.id_empresa,
      imagen: ''
    });
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(controlName: string): boolean {
    return this.vacantForm.controls[controlName].errors
        && this.vacantForm.controls[controlName].touched;
  }

  /* Validar formulario */
  formularioNoValido(): boolean {
    if (this.vacantForm.invalid) {
      this.vacantForm.markAllAsTouched();
      return true;
    }
    return false;
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
      title: 'Revisa el formulario',
      text: 'Revisa que el formulario esté correctamente llenado',
      showConfirmButton: false,
      timer: 2700
    });
  }

  doneMassage(): void {
    Swal.fire({
      icon: 'success',
      title: 'Vacante generada',
      text: 'Éxito en la busqueda del nuevo integrante',
      showConfirmButton: false,
      timer: 2700
    });
  }

  //  ---------- FORMULARIO ---------- //
  vacantCreateForm(): void {
    this.vacantForm = this.formB.group({
      id_empresa: [],
      puesto: [, [Validators.required, Validators.minLength(5)]],
      sueldo: [, [Validators.required, Validators.min(1)]],
      descripcion: [, Validators.required],
      imagen: [],
    });
  }

  create(): void {
    // Si el formulario es invalido
    if (this.formularioNoValido()) {
      this.errorMassage();
      return;
    }

    console.log(this.vacantForm.value);

    this.empresaSvc.createVacante(this.vacantForm.value).subscribe(
        response => {
          if (!response.status) {
            this.errorMassage();
          }
          // Mensaje de ok
          this.doneMassage();
          // Limpiar el formulario
          this.vacantForm.reset();
          this.vacantForm.markAsUntouched();
        },
        error => this.errorServer(error)
    );
  }

}
