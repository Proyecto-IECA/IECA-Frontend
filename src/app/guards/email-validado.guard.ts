import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GuardsService } from '../services/guards.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidadoGuard implements CanActivate {


  constructor(
    private router: Router,
    private guardService: GuardsService
  ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.guardService.validarEmail().pipe(
      tap((valid) => {
        if (!valid) {
          return this.router.navigateByUrl('/validarEmail');
        }
        return true;
      })
    );
  
  }

}
