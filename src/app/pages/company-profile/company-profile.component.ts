import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { EmpresaService } from './empresa.service';

import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

import { AuthResponseI } from '../../models/auth-response';
import { UsuarioI } from '../../models/usuario';
import { SucursalesI } from '../../models/sucursales';
import { SucursalesService } from '../components/forms/sucursales/sucursales.service';



@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  company: UsuarioI;
  imgUpdate: File;
  branches: SucursalesI[];
  companyForm: FormGroup;

  panel = false; // false
  haveBranches = true; // Dejarlo en false
  panelOpenState = false;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective; // autocompletar dirección

  constructor(private formB: FormBuilder,
              private empresaSvc: EmpresaService,
              private branchesSvc: SucursalesService) {
    /* Variables */

    /* Métodos */
    this.loadData();
    this.companyCreateForm();
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(controlName: string): boolean | Validators {
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
  errorServer(): void {
    // Lo sentimos su petición no puede ser procesada, favor de ponerse en contacto con soporte técnico
    Swal.fire({
      icon: 'error',
      title: 'Petición NO procesada',
      text: `Vuelve a intentar de nuevo...
      Si el error persiste ponerse en contacto con soporte técnico`,
    });
  }

  errorMassage(text: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: text,
      showConfirmButton: false,
      timer: 2700
    });
  }

  doneMassage(text: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: text,
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

    this.empresaSvc.readCompany().subscribe(
      (resp: AuthResponseI) => {
        // console.log(resp);
        if (!resp.status) {
          return this.errorMassage('Error al obtener los datos');
        }

        // Cargar datos al objeto company
        this.company = resp.data;
        // this.empresaSvc._company = resp.data;

        // Cargar datos al formulario
        this.companyForm.reset(resp.data);

        // Si no existe una foto, asignar una por default
        /*if (!resp.data.foto_empresa) {
          this.company.foto_perfil = './assets/img/faces/marc.jpg';
        }*/

        // if (resp.data.numero_sucursales > 0) { this.loadBranches(); }
        this.loadBranches(); // Borrar

      },
      error => {
          /* ! Mensaje de error si el servidor no recibe las peticiones */
          console.log(error);
          this.errorServer();
        });

  }

  /* Extraer las sucursales de la empresa */
  loadBranches() {
    this.panelOpenState = false;
    this.branchesSvc.readBranches().subscribe(
        (result: AuthResponseI) => this.branches = result.data,
        error => {
          /* ! Mensaje de error si el servidor no recibe las peticiones */
          console.log(error);
          this.errorServer();
        }
    );
  }

  /* Actualizar Datos de la Empresa */
  updateCompany(): void {

    // Validar formulario
    if (this.formularioNoValido()) {
      // Mensaje de error de validación
      return this.errorMassage('Para actualizar, completa el formulario');
    }

    console.log(this.companyForm.value);
    // Petición al services de actualizar la información de la empresa
    this.empresaSvc.updateCompany(this.companyForm.value).subscribe(
        response => {

          // Verificar que se haya actualizado la BD con el status
          if (!response.status) {
            // Mensaje de error de respuesta
            return this.errorMassage('No es posible actualizar los datos');
          }

          // Recargar el formulario y actualizar variables
          this.loadData();

          // Mensaje de cambios guardados
          return this.doneMassage('Información actualizada');
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          console.log(error);
          this.errorServer();
        }
    );

  }

  // Autocompletar la dirección en la ubicación
  public handleAddressChange(address: Address) {
    // Do some stuff
    // console.log(address);

    // Asignar el valor de google al formulario de registerEmpresaForm
    this.companyForm.reset({
      nombre: this.companyForm.value.nombre,
      administrador: this.companyForm.value.administrador,
      ubicacion: address.formatted_address,
      giro: this.companyForm.value.giro,
      pagina_web: this.companyForm.value.pagina_web,
      telefono: this.companyForm.value.telefono,
    });
  }

  /* Mostrar Imagen cargada */
  updateImg($event: Event | any): void {
/*
    // Evaluia si el $event está vacío
    if (!$event.target.files[0]) {
      return this.imgForm.reset();
    }

    // foltramos la variable $event para solo tomar lo importante
    const imageCapturada = $event.target.files[0];
    // this.imgForm.value.foto_empresa = $event.target.files[0].name;
    this.imgUpdate = $event.target.files[0];
    // console.log(imageCapturada.type);

    // Verificamos que el archivo cargado sea una imagen
    switch (imageCapturada.type) {
      case 'image/png':
        console.log('Archivo PNG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg();
        break;

      case 'image/jpeg':
        console.log('Archivo JPEG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg();
        break;

      case 'image/jpg':
        console.log('Archivo JPG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg();
        break;

      default:
        console.log(`El archivo es de tipo: ${imageCapturada.type}.`);
        console.log(this.imgForm);
        return this.imgForm.get('foto_empresa').setErrors({ noCompatible: true });
    }
*/
  }

  /* Actualizar Imagen en la Base de Datos */
  saveImg(): void {

    /*this.updateFile.actualizarFoto(this.imgUpdate)
        .then( img => {
          console.log(img);
        });*/

    /*console.log(this.company.foto_empresa);
    try {
      // this.imgForm.get('foto_empresa').setValue(this.company.foto_empresa);
      console.log(this.imgForm.value);
      this.updateFile.actualizarFoto(this.imgForm.value).subscribe((resp: AuthResponseI) => {
        if (!resp.status) {
          return this.errorMassage();
        }
        console.log('Foto guardada correctamente');
      });
    } catch (error)  {
      /!* Mensaje de error si el servidor no recibe las peticiones *!/
      console.log(error);
      return this.errorServer();
    }*/
  }



}
