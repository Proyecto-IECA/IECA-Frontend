import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-warning-messages',
  templateUrl: './warning-messages.component.html',
  styleUrls: ['./warning-messages.component.css']
})
export class WarningMessagesComponent implements OnInit {

  email_validado: boolean;
  tipo: number;
  token: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
    this.tipo = 0;
    this.token = '';
    this.email_validado = false;
  }

  ngOnInit(): void {
    this.params();
  }

  //  ---------- MENSAJES ---------- //
  errorServer(): void { // Lo sentimos su petición no puede ser procesada, favor de ponerse en contacto con soporte técnico
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
      title: 'Datos incorrectos',
      text: 'Vuelve a intentarlo de nuevo...',
    });
  }

  params(): void {
    this.activatedRoute.params.subscribe(
      params => {
      this.tipo = Number(params.tipo);
      this.token = params.token;
      if (this.tipo === 1) {
        console.log('Tipo: ', this.tipo);
        this.validarEmailPostulante();
      }
      if (this.tipo === 2) {
        console.log('Tipo: ', this.tipo);
        this.validarEmailEmpresa();
      }
    });
  }

  validarEmailPostulante(): void {
      this.authService.validarEmailUsuario(this.token).subscribe(
        postulante => {
          console.log(postulante);
          if (!postulante.status) {
            /* Mensaje de error en Sweetalert2 */
            this.errorMassage();
            return;
          }
          this.email_validado = true;
          return;
        },
        error => {
          /* Mensaje de error si el servidor no recibe las peticiones */
          this.errorServer();
          console.log(error);
        }
      );
  }

  validarEmailEmpresa(): void {
    this.authService.validarEmailEmpresa(this.token).subscribe(
      empresa => {
        console.log(empresa);
        if (!empresa.status) {
          /* Mensaje de error en Sweetalert2 */
          this.errorMassage();
        }
        this.email_validado = true;
        return;
      },
      error => {
        /* Mensaje de error si el servidor no recibe las peticiones */
        this.errorServer();
        console.log(error);
      }
    );
  }

}
