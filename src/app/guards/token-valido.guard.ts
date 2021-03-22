import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenValidoGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    console.log('Guardian Token-Valido');
    // return this.authService.validarEmailValidado()
    return this.authService.validarToken()
        .pipe(
            tap((valid) => {
              if (!valid) {
                this.router.navigateByUrl('/auth');
              }
              return true;
            })
        );

  }

}
