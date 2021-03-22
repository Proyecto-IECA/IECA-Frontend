import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaI } from '../../models/empresa';
import { AuthResponseI } from '../../models/auth-response';

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
      position: 'top-end',
      icon: 'success',
      title: 'Perfil actualizado',
      showConfirmButton: false,
      timer: 1700
    });
  }

  //  ---------- FORMULARIO ---------- //
  companyCreateForm(): void {
    this.companyForm = this.formB.group({
      nombre: [, [Validators.required, Validators.minLength(2)]],
      administrador: [, [Validators.required, Validators.minLength(3)]],
      ubicacion: [, [Validators.required, Validators.minLength(5)]],
      giro: [, [Validators.required, Validators.minLength(3)]],
      pagina_web: [, Validators.required],
      telefono: [, [Validators.required, Validators.maxLength(10)]],
    });
  }

  //  ---------- MÉTODOS ---------- //
  /* Cargar datos al template */
  loadData(): void {
    // Cargar datos del Card de perfil
    // this.company = this.empresaSvc.company;
    this.empresaSvc.readCompany(this.empresaSvc.company.id_empresa).subscribe(
        (value: AuthResponseI) =>
            // Cargar datos al formulario
            this.companyForm.reset(value.data),
        error =>
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer(error)
        );
  }

  /* Actualizar Datos de la Empresa */
  updateCompany(): void {

    // Validar formulario
    if (this.formularioNoValido()) {
      // Mensaje de error de validación
      return this.errorMassage();
    }

    // Extraemos los valores del formulario
    const data = this.companyForm.value;

    // Petición al services de actualizar la información de la empresa
    this.empresaSvc.updateCompany(data).subscribe(
        response => {
          if (!response.status) {
            // Mensaje de error de respuesta
            return this.errorMassage();
          }

          // Mensaje de cambios guardados
          return this.doneMassage();
        },
        error =>
            /* Mensaje de error si el servidor no recibe las peticiones */
            this.errorServer(error)
    )

  }

}
