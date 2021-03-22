import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidadoGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('Guardian Email-Validado');
    // return this.authService.validarToken()
    return this.authService.validarEmailValidado()
      .pipe(
        tap((valid) => {
          if (!valid) {
            return this.router.navigateByUrl('/validarEmail');
          }
        })
      );
  }

}
