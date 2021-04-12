import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { EmpresaService } from '../../services/empresa.service';
import { EmpresaI } from '../../models/empresa';
import { AuthResponseI } from '../../models/auth-response';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  company: EmpresaI;
  imgUpdate: File;

  companyForm: FormGroup;
  imgForm: FormGroup;
  panelExpA = false;

  constructor(private formB: FormBuilder,
              private empresaSvc: EmpresaService,
              private updateFile: FileUploadService) {
    /* Variables */
    this.company = this.empresaSvc.company;

    /* Métodos */
    this.loadData();
    this.companyCreateForm();
    this.imgCreateForm();
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //
  /* Validar los control name */
  controlNoValid(controlName: string, imgForm: boolean = false): boolean | Validators {
    return (imgForm)

        ? this.imgForm.controls[controlName].hasError('noCompatible')

        : this.companyForm.controls[controlName].errors
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

  imgCreateForm(): void {
    this.imgForm = this.formB.group({
      foto_empresa: [],
    });
  }

  //  ---------- MÉTODOS ---------- //
  /* Cargar datos al template */
  loadData(): void {
    // Cargar datos del Card de perfil
    // this.company = this.empresaSvc.company;
    this.empresaSvc.readCompany(this.empresaSvc.company.id_empresa).subscribe(
        (value: AuthResponseI) => {

          // Cargar datos a la objeto company
          this.company = value.data;

          // Cargar datos al formulario
          this.companyForm.reset(value.data);

          // Si no existe una foto, asignar una por default
          if (!value.data.foto_empresa) {
            this.company.foto_empresa = './assets/img/faces/marc.jpg';
          }
},
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
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
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          console.log(error);
          this.errorServer();
        }
    );

  }

  /* Mostrar Imagen cargada */
  updateImg($event: Event | any): void {

    // Evaluia si el $event está vacío
    if (!$event.target.files[0]) {
      return this.imgForm.reset();
    }

    // foltramos la variable $event para solo tomar lo importante
    const imageCapturada = $event.target.files[0];
    // console.log(imageCapturada.type);

    // Verificamos que el archivo cargado sea una imagen
    switch (imageCapturada.type) {
      case 'image/png':
        console.log('Archivo PNG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg(imageCapturada);
        break;

      case 'image/jpeg':
        console.log('Archivo JPEG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg(imageCapturada);
        break;

      case 'image/jpg':
        console.log('Archivo JPG');
        this.imgForm.get('foto_empresa').setErrors(null);
        this.showImg(imageCapturada);
        break;

      default:
        console.log(`El archivo es de tipo: ${imageCapturada.type}.`);
        console.log(this.imgForm);
        return this.imgForm.get('foto_empresa').setErrors({ noCompatible: true });
    }

  }

  /* Mostrar la imagen cargada */
  showImg(imageCapturada: Event): void {
    this.updateFile.extraerBase64(imageCapturada).then(
        (image: any) => {
          console.log(image);
          this.company.foto_empresa = image.base;
          this.imgForm.value.foto_empresa = image.base;
          // console.log(this.imgForm);
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          console.log(error);
          this.errorServer();
        }
    );
  }

  /* Actualizar Imagen en la Base de Datos */
  saveImg(): void {
    console.log(this.company.foto_empresa);
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
      /* Mensaje de error si el servidor no recibe las peticiones */
      console.log(error);
      return this.errorServer();
    }
  }

}
