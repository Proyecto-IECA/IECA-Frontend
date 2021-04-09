import { Component, Host, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as _rollupMoment from 'moment';

import {Moment} from 'moment';


import { FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from '../../../services/usuario.service';
import { ExperienciaLaboralI } from '../../../models/experiencia_laboral';
import { AuthResponseI } from '../../../models/auth-response';
import Swal from 'sweetalert2';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-experiencia-laboral-form',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
}) 
export class ExperienciaLaboralComponent implements OnInit {

  public formSubmitted = false;
  @Input() experienciaLaboral: ExperienciaLaboralI;
  @Input() tipo: string;
  activedFecha_salida = false;

  public laboralForm = this.formBuilder.group(
    {
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      actividades: ['', Validators.required],
      fecha_entrada: ['', Validators.required],
      fecha_salida: [''],
      trabajando: [false]
    }
  );

  //date = new FormControl(moment([2000, 0]));
  //date2 = new FormControl(moment([2000, 0]));
  

  chosenYearHandler(normalizedYear: Moment, tipo: number) {
    if (tipo == 1) {

      if (!this.laboralForm.get('fecha_entrada').value) {
        this.laboralForm.get('fecha_entrada').setValue(moment([2000, 0]));
      } 

      const ctrlValue = this.laboralForm.get('fecha_entrada').value;
      ctrlValue.year(normalizedYear.year());
      this.laboralForm.get('fecha_entrada').setValue(ctrlValue);

    } else {

      if (!this.laboralForm.get('fecha_salida').value) {
        this.laboralForm.get('fecha_salida').setValue(moment([2000, 0]));
      } 

      const ctrlValue2 = this.laboralForm.get('fecha_salida').value;
      ctrlValue2.year(normalizedYear.year());
      this.laboralForm.get('fecha_salida').setValue(ctrlValue2);
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, tipo: number) {
    if (tipo == 1) {
      const ctrlValue = this.laboralForm.get('fecha_entrada').value;
      ctrlValue.month(normalizedMonth.month());
      this.laboralForm.get('fecha_entrada').setValue(ctrlValue);
      datepicker.close();
    } else {
      const ctrlValue2 = this.laboralForm.get('fecha_salida').value;
      ctrlValue2.month(normalizedMonth.month());
      this.laboralForm.get('fecha_salida').setValue(ctrlValue2);
      datepicker.close();
    }
  }

  constructor(
      private formBuilder: FormBuilder, 
      private usuarioService: UsuarioService, 
      @Host() private _userProC: UserProfileComponent
    ) {}

  ngOnInit(): void {
    if (this.tipo == 'update') {
      this.loadData(this.experienciaLaboral);
    }
  }

  campoNoValido(campo: string): boolean {
    if(this.laboralForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  fechaEntradaValida() {
    if(!this.formSubmitted) return false;

    let fecha_entrada = this.laboralForm.get('fecha_entrada').value;
    let date = moment(fecha_entrada);

    if(date.isValid()) return false;

    return true;
  }

  fechaSalidaValida() {
    if(this.activedFecha_salida && !this.formSubmitted) return false;

    let fecha_salida = this.laboralForm.get('fecha_salida').value;
    let date = moment(fecha_salida);

    if(date.isValid()) return false;

    return true;
  }

  loadData( expLaboral: ExperienciaLaboralI) {
    if (expLaboral.trabajando) {
      this.activedFecha_salida = true;
    }
    this.laboralForm.reset(expLaboral);
    let fecha_entrada = moment(expLaboral.fecha_entrada, 'MM/YYYY'); 
    this.laboralForm.get('fecha_entrada').setValue(fecha_entrada);
    let fecha_salida = moment(expLaboral.fecha_salida, 'MM/YYYY'); 
    this.laboralForm.get('fecha_salida').setValue(fecha_salida);
    // let d = moment(this.date2.value);
    // console.log(d.format('YYYY/MM'))    
  }

  actionForm(formDirective: FormGroupDirective) {
    if(this.tipo == 'add') {
      this.addExpLaboral(formDirective);
    } else {
      this.updateExpLaboral();
    }
  }

  

  addExpLaboral(formDirective: FormGroupDirective){
    this.formSubmitted = true;
    if(this.laboralForm.valid){
      this.usuarioService.createExpLaboral(this.laboralForm.value).subscribe((resp: AuthResponseI) => {
        if(resp.status){
          this._userProC.experienciasLaborales = resp.data;
          this.formSubmitted = false;
          this.laboralForm.reset();
          formDirective.resetForm();
          this.laboralForm.get('trabajando').setValue(false);
          this._userProC.panelExpL = false;
          this.doneMassage(resp.message);
        } else {
          this.errorPeticion(resp.message);
        }
      }, (error) => this.errorServer(error));
    } else {
      this.errorMassage();
    }
  }

  cancelarAdd(formDirective: FormGroupDirective) {
    this.formSubmitted = false;
    this.laboralForm.reset();
    formDirective.resetForm();
    this.laboralForm.get('trabajando').setValue(false);
    this.activedFecha_salida = false;
    this._userProC.panelExpL = false;
  }

  updateExpLaboral(){
    this.formSubmitted = true;
    if(this.laboralForm.valid) {
      this.usuarioService.updateExpLaboral(this.laboralForm.value, this.experienciaLaboral.id_experiencia_laboral).subscribe((resp: AuthResponseI) => {
        if(resp.status) {
          this._userProC.experienciasLaborales = resp.data;
          this.doneMassage(resp.message);
        } else {
          this.errorPeticion(resp.message);
        }
      }, (error) => this.errorServer(error));
    } else {
      this.errorMassage();
    }
  }

  deleteExpLaboral(){
    this.usuarioService.deleteExpLaboral(this.experienciaLaboral.id_experiencia_laboral).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this._userProC.experienciasLaborales = resp.data;
        this.doneMassage(resp.message);
      } else {
        this.errorPeticion(resp.message);
      }
    }, (error) => this.errorServer(error));    
  } 
  
  ischecked() {
    if (this.laboralForm.get('trabajando').value) {
      this.activedFecha_salida = false;
    } else {
      this.activedFecha_salida = true;
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
}
