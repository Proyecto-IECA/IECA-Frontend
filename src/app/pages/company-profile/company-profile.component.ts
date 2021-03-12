import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaI } from '../../models/empresa';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  companyForm: FormGroup;
  company: EmpresaI;

  constructor(private formB: FormBuilder,
              private empresaSvc: EmpresaService) {
    this.companyCreateForm();
  }

  ngOnInit(): void {
    this.loadData();
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(controlName: string): boolean {
    return this.companyForm.controls[controlName].errors
        && this.companyForm.controls[controlName].touched;
  }

  /* Validar formulario */
  formularioNoValido(): boolean {
    if (this.companyForm.invalid) {
      this.companyForm.markAllAsTouched();
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
      title: 'Perfil actualizado',
      text: 'Tu perfil se actualizó de forma exitosa',
      showConfirmButton: false,
      timer: 2700
    });
  }

  //  ---------- FORMULARIO ---------- //
  companyCreateForm(): void {
    this.companyForm = this.formB.group({
      nombre: [, [Validators.required, Validators.minLength(5)]],
      administrador: [Validators.required, Validators.minLength(5)],
      ubicacion: [Validators.required, Validators.minLength(5)],
      giro: [, [Validators.required, Validators.minLength(3)]],
      pagina_web: [, Validators.required],
      telefono: [, [Validators.required, Validators.maxLength(10)]],
    });
  }

  //  ---------- MÉTODOS ---------- //
  /* Cargar datos al template */
  loadData(): void {
    // Cargar datos del Card de perfil
    this.company = this.empresaSvc.company;

    // Cargar datos al formulario
    this.companyForm.reset(this.empresaSvc.company);
  }

  /* Actualizar Datos de la Empresa */
  updateCompany(): void {

    // Validar formulario
    if (this.formularioNoValido()) {
      // Mensaje de error de validación
      this.errorMassage();
    }

    // Extraemos los valores del formulario
    const data = this.companyForm.value;

    // Petición al services de actualizar la información de la empresa
    this.empresaSvc.updateCompany(data).subscribe(
        response => {
          if (!response.status) {
            // Mensaje de error de respuesta
            this.errorMassage();
          }

          // Mensaje de cambios guardados
          this.doneMassage();
        },
        error => this.errorServer(error)
    )

  }

}
