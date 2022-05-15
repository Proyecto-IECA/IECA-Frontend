import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import Swal from "sweetalert2";
import { GuardsService } from "../services/guards.service";

@Injectable({
  providedIn: "root",
})
export class PerfilCompletoGuard implements CanActivate {
  validatedEmpresa(errors): void {
    Swal.fire({
      icon: "info",
      title: "Para poder crear vacantes completa tu perfil",
      html: errors,
      confirmButtonText: "Completarlo Ahora!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/company-profile');
      }
    });
  }


  constructor(
    private guardService: GuardsService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.guardService.validarPerfil().pipe(
      map((resp) => {
        if (!resp.status) {
          let errors = `<p>Campos Faltantes: </p>`;
          resp.data.forEach((error) => {
            errors += `<div>${error}</div>`;
          });

          this.validatedEmpresa(errors);
          
          return false;
        }

        return true;
      })
    );
  }
}
