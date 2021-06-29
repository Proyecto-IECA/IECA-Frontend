import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthUserService } from '../auth-user.service';
import { AuthResponseI } from '../../models/auth-response';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  private expresionRegularCURP = new RegExp(
  '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}' +
  '(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])' +
  '[HM]{1}' +
  '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)' +
  '[B-DF-HJ-NP-TV-Z]{3}' +
  '[0-9A-Z]{1}[0-9]{1}$');

  constructor(
    private socialService: AuthUserService
  ) { }

  ngOnInit(): void {
  }

  vincularCuenta(CURP) {
    this.socialService.vincularCuenta(CURP).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.statusVinculacion('Datos Correctos', resp.data);
      }
      else {
        this.statusVinculacion('Datos Incorrectos', resp.data);
      }
    }, (err) => {
      console.log(err);
      this.errorServer();
    })
  }

  accountIECA() {
    Swal.fire({
      title: 'Vincula tu cuenta de IECA',
      text: 'Escribe tu CURP',
      input: 'text',
      inputPlaceholder: 'XXXX000000XXXXXX00',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Validar',
      showLoaderOnConfirm: true,
      customClass: {
        input: 'text-uppercase'
      },
      inputAttributes: {
        autocorrect: 'off',
        autocapitalize: 'on',
        maxlength: '18',
        minlength: '18'
      },
      inputValidator: (CURP) => {
        CURP = CURP.toUpperCase();
        console.log(CURP);
        if (CURP.length != 18 || !this.expresionRegularCURP.test(CURP)) {
          return 'CURP Inválida';
        }
      },
      preConfirm: (CURP) => {
        if (CURP) {
          this.vincularCuenta(CURP);
        }
        Swal.showLoading();
      }
    })
  }

  statusVinculacion(title, message) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message
    })
  }

  errorServer() { 
    Swal.fire({
      icon: 'error',
      title: 'Petición no procesada',
      text: `Vuelve a intentar de nuevo.
      Si el error persiste, comuníquese con soporte técnico.`,
    });
  }
}
