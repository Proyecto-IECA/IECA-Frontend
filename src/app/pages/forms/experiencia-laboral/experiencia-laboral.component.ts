import { Component, Input, OnInit } from '@angular/core';
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
import { ExperienciaLaboralI } from '../../../models/experiencia_laboral';
import { AuthResponseI } from '../../../models/auth-response';

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

  public formSubmitted = true;
  @Input() experienciaLaboral: ExperienciaLaboralI;
  @Input() tipo: string;

  public laboralForm = this.formBuilder.group(
    {
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      actividades: ['', Validators.required],
      fecha_entrada: ['', Validators.required],
      fecha_salida: [''],
      trabajando: []
    }
  )

  date = new FormControl();
  date2 = new FormControl();
  

  chosenYearHandler(normalizedYear: Moment, tipo: number) {
    if (tipo == 1) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
    } else {
      const ctrlValue2 = this.date2.value;
      ctrlValue2.year(normalizedYear.year());
      this.date2.setValue(ctrlValue2);
    }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>, tipo: number) {
    if (tipo == 1) {
      const ctrlValue = this.date.value;
      ctrlValue.month(normalizedMonth.month());
      this.date.setValue(ctrlValue);
      datepicker.close();
    } else {
      const ctrlValue2 = this.date2.value;
      ctrlValue2.month(normalizedMonth.month());
      this.date2.setValue(ctrlValue2);
      datepicker.close();
    }
  }

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

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

  loadData( expLaboral: ExperienciaLaboralI) {
    this.laboralForm.reset(expLaboral);
    let fecha_entrada = moment(expLaboral.fecha_entrada, 'MM/YYYY'); 
    this.date = new FormControl(fecha_entrada);
    let fecha_salida = moment(expLaboral.fecha_salida, 'MM/YYYY'); 
    this.date2 = new FormControl(fecha_salida);
    // let d = moment(this.date2.value);
    // console.log(d.format('YYYY/MM'))    
  }

}
