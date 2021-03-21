import { Component, Host, Input, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormBuilder, Validators } from "@angular/forms";
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as _rollupMoment from 'moment';

import {Moment} from 'moment';
import { UsuarioService } from '../../../services/usuario.service';
import { ExperienciaAcademicaI } from '../../../models/experiencia_academica';
import Swal from 'sweetalert2';
import { AuthResponseI } from '../../../models/auth-response';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-experiencia-academica-form',
  templateUrl: './experiencia-academica.component.html',
  styleUrls: ['./experiencia-academica.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class ExperienciaAcademicaComponent implements OnInit {

  public formSubmitted = false;
  @Input() experienciaAcademica: ExperienciaAcademicaI;
  @Input() tipo: string;
  activedAnio_salida = false;

  
  public academicaForm = this.formBuilder.group(
    {
      nivel: ['', Validators.required],
      institucion: ['', Validators.required],
      anio_entrada: ['', Validators.required],
      anio_salida: [''],
      carrera: [''],
      estudiando: [false]
    }
  )
  date = new FormControl(moment([2000]));
  date2 = new FormControl(moment([2000]));
  
  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>, tipo: number) {
    if (tipo == 1) {
      if (!this.date.value) {
        this.date = new FormControl(moment([2000]));
      } 
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
      datepicker.close();
    } else {
      if (!this.date2.value) {
        this.date2 = new FormControl(moment([2000]));
      } 
      const ctrlValue2 = this.date2.value;
      ctrlValue2.year(normalizedYear.year());
      this.date2.setValue(ctrlValue2);
      datepicker.close();
    }
  }
  
  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, @Host() private _userProC: UserProfileComponent) { }

  ngOnInit(): void {
    if (this.tipo == 'update') {
      this.loadData(this.experienciaAcademica);
    }
  }
  campoNoValido(campo: string): boolean {
    if(this.academicaForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  loadData( expAcademica: ExperienciaAcademicaI) {
    if (expAcademica.estudiando) {
      this.activedAnio_salida = true;
    }
    this.academicaForm.reset(expAcademica);
    let anio_entrada = moment(expAcademica.anio_entrada, 'YYYY');
    this.date = new FormControl(moment(anio_entrada));
    let anio_salida = moment(expAcademica.anio_salida, 'YYYY');
    this.date2 = new FormControl(moment(anio_salida));

  }

  addExpAcademica(){
    this.formSubmitted = true;
    this.loadFechasForm();
    if(this.academicaForm.valid) {
      this.usuarioService.createExpAcademica(this.academicaForm.value).subscribe((resp: AuthResponseI) => {
        if(resp.status){
          this._userProC.experienciasAcademicas = resp.data;
          this.doneMassage(resp.message);
        } else {
          this.errorPeticion(resp.message);
        }
      }, (error) => this.errorServer(error))
    } else {
      this.errorMassage();
    }
  }

  updateExpAcademica(){
    this.formSubmitted = true;
    this.loadFechasForm();
    if(this.academicaForm.valid){
      this.usuarioService.updateExpAcademica(this.academicaForm.value, this.experienciaAcademica.id_experiencia_academica).subscribe((resp: AuthResponseI) => {
        if(resp.status) {
          this._userProC.experienciasAcademicas = resp.data;
          this.doneMassage(resp.message);
        } else {
          this.errorPeticion(resp.message);
        }
      }, (error) => this.errorServer(error));
    } else {
      this.errorMassage();
    }
  }

  deleteExpAcademica(){
    this.usuarioService.deleteExpAcademica(this.experienciaAcademica.id_experiencia_academica).subscribe((resp: AuthResponseI) => {
      if(resp.status){
        this._userProC.experienciasAcademicas = resp.data;
        this.doneMassage(resp.message);
      } else {
        this.errorMassage();
      }
    }) 
  }

  actionForm(){
    if(this.tipo=='add'){
      this.addExpAcademica();
    } else {
      this.updateExpAcademica();
    }
  }

  loadFechasForm() {
    if (!this.activedAnio_salida) {
      let date = moment(this.date.value);
      let anio_entrada = date.format('YYYY');
      this.academicaForm.get('anio_entrada').setValue(anio_entrada);
      let date2 = moment(this.date2.value);
      let anio_salida = date2.format('YYYY');
      this.academicaForm.get('anio_salida').setValue(anio_salida);
    } else {
      let date = moment(this.date.value);
      let anio_entrada = date.format('YYYY');
      this.academicaForm.get('anio_entrada').setValue(anio_entrada);
    }
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

  doneMassage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Cambios Actualizados',
      text: message,
      showConfirmButton: false,
      timer: 2700
    });
  }

  errorPeticion(error: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error,
      showConfirmButton: false,
      timer: 2700
    });
  }

  ischecked() {
    if (this.academicaForm.get('estudiando').value) {
      this.activedAnio_salida = false;
    } else {
      this.activedAnio_salida = true;
    }
  }

}
