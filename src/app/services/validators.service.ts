import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // ***** Validar password *****\\
  ValidarPassword(pass: string, password: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass];
      const pass2Control = formGroup.controls[password];

      // Comprueba que ambos passwords sean iguales
      (pass1Control.value === pass2Control.value)
          ? pass2Control.setErrors(null)
          : pass2Control.setErrors({ noSonIguales: true });
    };
  }

}

interface ErrorValidator {
  [s: string]: boolean;
}
