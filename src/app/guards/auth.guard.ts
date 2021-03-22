import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private authService: AuthService,
              private router: Router) {  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('Guardian canActivate');
    // return this.authService.validarToken()
    return this.authService.validarEmailValidado()
      .pipe(
        tap((valid) => {
          if (!valid) {
            return this.router.navigateByUrl('/validarEmail');
          }
          return true;
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    console.log('Guardian canLoad');
    // return this.authService.validarEmailValidado()
    return this.authService.validarToken()
      .pipe(
        tap((valid) => {
          if (!valid) {
            // this.router.navigateByUrl('/validarEmail');
            this.router.navigateByUrl('/auth');
          }
          return true;
        })
      );
  }

}
