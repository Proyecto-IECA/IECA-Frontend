import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { VacancyService } from './vacancy.service';
import { SucursalesI } from '../../models/sucursales';
import { AuthResponseI } from '../../models/auth-response';
import { PerfilI } from '../../models/perfil';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Element {
  value: string,
  viewValue: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const NIVEL: Element[] = [
  {value: "Practicante", viewValue: "Practicante"},
  {value: "Ejecutivo", viewValue: "Ejecutivo"},
  {value: "Supervisor", viewValue: "Supervisor"},
];

const MODALIDAD: Element[] = [
  {value: "Tiempo completo", viewValue:"Tiempo completo"},
  {value: "Medio tiempo", viewValue:"Medio tiempo"},
  {value: "Temporal", viewValue: "Temporal"},
  {value: "Home Office", viewValue: "Home Office"},
]



@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: [ './create-vacancy.component.css'
  ]
})
export class CreateVacancyComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  niveles = NIVEL;
  modalidades = MODALIDAD;
  sucursales: SucursalesI[]; 
  perfiles: PerfilI[];
  idVacante: number = 1;
  type: string = "Vacante";
  //  ---------- VARIABLES ---------- //
  vacantForm: FormGroup;

  constructor(
      private formB: FormBuilder,
      private empresaSvc: EmpresaService,
      private vacanteService: VacancyService
  ) {
    this.vacantCreateForm();
  }

  ngOnInit(): void {
    this.vacanteService.getSucursales().subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.sucursales = resp.data;
        }
      }
    )

    this.vacanteService.getPerfilesVacantes(1).subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.perfiles = resp.data;
        }
      }
    )
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

  capturarImage(event) {
    console.log(event);
  }

}
