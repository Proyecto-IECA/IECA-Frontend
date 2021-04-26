import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SucursalesI } from '../../../../models/sucursales';

export interface Element {
  value: string,
  viewValue: string
}

const NIVEL: Element[] = [
  {value: 'Practicante', viewValue: 'Practicante'},
  {value: 'Ejecutivo', viewValue: 'Ejecutivo'},
  {value: 'Supervisor', viewValue: 'Supervisor'},
];

const MODALIDAD: Element[] = [
  {value: 'Tiempo completo', viewValue: 'Tiempo completo'},
  {value: 'Medio tiempo', viewValue: 'Medio tiempo'},
  {value: 'Temporal', viewValue: 'Temporal'},
  {value: 'Home Office', viewValue: 'Home Office'},
]

@Component({
  selector: 'app-vacante',
  templateUrl: './vacante.component.html',
  styleUrls: ['./vacante.component.css']
})
export class VacanteComponent implements OnInit {

  niveles = NIVEL;
  modalidades = MODALIDAD;
  @Input() sucursales: SucursalesI[];
  vacantForm: FormGroup;

  constructor(private formB: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.vacanteCreateForm();
  }

    //  ---------- FORMULARIO ---------- //
    vacanteCreateForm(): void {
      this.vacantForm = this.formB.group({
        puesto: [, [Validators.required, Validators.minLength(5)]],
        nivel: [, [Validators.required]],
        sueldo: [, [Validators.required, Validators.min(1)]],
        modalidad: [,[Validators.required]],
        descripcion: [, Validators.required],
        id_sucursal_fk: []
      });
    }

  addVacante(): void {
    // Si el formulario es invalido
    if (this.formularioNoValido()) {
      this.errorMassage();
      return;
    }

    console.log(this.vacantForm.value);

    // this.empresaSvc.createVacante(this.vacantForm.value).subscribe(
    //     response => {
    //       if (!response.status) {
    //         this.errorMassage();
    //       }
    //       // Mensaje de ok
    //       this.doneMassage();
    //       // Limpiar el formulario
    //       this.vacantForm.reset();
    //       this.vacantForm.markAsUntouched();
    //     },
    //     error => this.errorServer(error)
    // );
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
}
