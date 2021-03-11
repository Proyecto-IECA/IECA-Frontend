import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class PerfilCompletoGuard implements CanActivate {

    validatedPerfil(): void {
        /* Mensaje de completar perfil */
        Swal.fire({
            icon: 'question',
            title: 'Perfil incompleto',
            text: 'Para poder ingresar debes completar tu perfil',
        });
    }

    constructor(private authService: AuthService) {
    }

    canActivate(): Observable<boolean> | boolean {
        console.log('Guardian canActivate: Perfil Completo');
        return this.authService.validarPerfil()
            .pipe(
                tap((valid) => {
                    console.log(valid);
                    if (!valid) {
                        return false;
                    }
                    return true;
                })
            );
    }

}
