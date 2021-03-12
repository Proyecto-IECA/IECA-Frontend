import { Component, OnInit } from '@angular/core';
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

  public laboralForm = this.formBuilder.group(
    {
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      actividades: ['', Validators.required],
      fecha_entrada: ['', Validators.required],
      fecha_salida: ['']
    }
  )

  date = new FormControl(moment([2000, 0]));
  date2 = new FormControl(moment([2000, 0]));
  

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
  }

}
