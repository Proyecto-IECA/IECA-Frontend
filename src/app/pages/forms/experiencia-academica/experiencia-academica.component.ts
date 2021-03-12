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
import { ExperienciaAcademicaI } from '../../../models/experiencia_academica';

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

  public formSubmitted = true;
  
  public academicaForm = this.formBuilder.group(
    {
      nivel: ['', Validators.required],
      institucion: ['', Validators.required],
      anio_entrada: ['', Validators.required],
      anio_salida: [''],
      carrera: ['']
    }
  )
  date = new FormControl(moment([2000, 0]));
  date2 = new FormControl(moment([2000, 0]));
  
  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>, tipo: number) {
    if (tipo == 1) {
      const ctrlValue = this.date.value;
      ctrlValue.year(normalizedYear.year());
      this.date.setValue(ctrlValue);
      datepicker.close();
    } else {
      const ctrlValue2 = this.date2.value;
      ctrlValue2.year(normalizedYear.year());
      this.date2.setValue(ctrlValue2);
      datepicker.close();
    }
  }
  
  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }
  campoNoValido(campo: string): boolean {
    if(this.academicaForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  loadData( expAcademica: ExperienciaAcademicaI) {
    this.academicaForm.reset(expAcademica);
  }
}
