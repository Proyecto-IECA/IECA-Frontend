import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TipoEmpresa implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
        
        let tipoUsuario = localStorage.getItem('tipo_usuario');
        if (tipoUsuario == null) return false

        if (tipoUsuario == 'Empresa') { 
            return true;
        } else {
            this.router.navigateByUrl('/vacancies');
        }
    }
}