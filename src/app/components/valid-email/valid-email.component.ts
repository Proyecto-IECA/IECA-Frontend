import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-valid-email',
    templateUrl: './valid-email.component.html',
    styleUrls: ['./valid-email.component.css']
})
export class ValidEmailComponent implements OnInit {

    email_validado: boolean;
    tipo: number;
    token: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {
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

    emailEnviado(): void {
        Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: 'Favor de revisar su bandeja de entrada o spam',
            showConfirmButton: false,
            timer: 2700
        });
    }

    //  ---------- RECIBIR PARAMETROS DE LA URL ---------- //
    params(): void {
        this.activatedRoute.params.subscribe(
            params => {
                localStorage.setItem('tipo', params.tipo);
                this.tipo = Number(params.tipo);
                this.token = params.token;
                this.tipoPeticion();
            });
    }

    //  ----------  ---------- //
    tipoPeticion(): void {
        if (this.tipo === 1) {
            console.log('Tipo: ', this.tipo);
            this.validarEmailPostulante();
        }
        if (this.tipo === 2) {
            console.log('Tipo: ', this.tipo);
            this.validarEmailEmpresa();
        }
    }

    //  ---------- PETICIONES ---------- //
    validarEmailPostulante(): void {
        this.authService.validarEmailUsuario(this.token).subscribe(
            postulante => {
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

    reenviarCorreo(): void {
        // Peticion mamalona para reenviar el correo de validacion
        this.authService.validarEmail().subscribe(
            response => {
                if (!response.status) {
                    /* Mensaje de error en Sweetalert2 */
                    return this.errorMassage();
                }
                return this.emailEnviado(); // email enviado
            },
            error => {
                /* Mensaje de error si el servidor no recibe las peticiones */
                this.errorServer();
                console.log(error);
            }
        );
    }

}