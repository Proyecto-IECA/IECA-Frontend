import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class PerfilCompletoGuard implements CanActivate {

    validatedPerfil(): void {
        /* Mensaje de completar perfil */
        Swal.fire({
            icon: 'info',
            title: 'Perfil incompleto',
            text: 'Para poder ingresar debes completar tu perfil',
        });
    }

    constructor() {
    }

    canActivate(): Observable<boolean> | boolean {
        // console.log('Guardian canActivate: Perfil Completo');
        // return this.authService.validarPerfil()
        //     .pipe(
        //         tap((valid) => {
        //             if (!valid) {
        //                 this.validatedPerfil();
        //                 return false;
        //             }
        //             return true;
        //         })
        //     );
        return true;
    }

}
