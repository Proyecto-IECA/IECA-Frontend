import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardsService } from '../services/guards.service';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenValidoGuard implements CanActivate {

  constructor(
    private guardService: GuardsService,
    private router: Router
  ) {  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.guardService.validarToken().pipe(
        tap((valid) => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
          return true;
        })
    );

  }

}
