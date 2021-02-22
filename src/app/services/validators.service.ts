import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  // ***** Validar password *****\\
  ValidarPassword(pass: string, password: string): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup): ValidationErrors => {
      const pass1Control = formGroup.controls[pass];
      const pass2Control = formGroup.controls[password];

      // Comprueba que ambos passwords sean iguales
      if (pass1Control.value !== pass2Control.value) {
        pass2Control.setErrors({ noSonIguales: true }); // Regresa un TRUE en enviar error
        return { noSonIguales: true };
      }
      pass2Control.setErrors({ noSonIguales: false }); // Regresa un FALSE en enviar error
      return { noSonIguales: false };
    };
  }

}

interface ErrorValidator {
  [s: string]: boolean;
}
