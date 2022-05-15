import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TipoPostulante implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
        
        
        let tipoUsuario = localStorage.getItem('tipo_usuario');
        if (tipoUsuario == null) return false

        if (tipoUsuario == 'Postulante') { 
            return true;
        } else {
            this.router.navigateByUrl('/my-vacancies');
        }
    }
}