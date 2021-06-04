import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
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
    });
  }

  validatedPostulante(errors): void {
    Swal.fire({
      icon: "info",
      title: "Para poder ver las vacantes y postularte completa tu perfil",
      html: errors,
    });
  }

  constructor(private guardService: GuardsService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.guardService.validarPerfil().pipe(
      map((resp) => {
        if (!resp.status) {
          const tipoUsuario = localStorage.getItem("tipo_usuario");
          let errors = `<p>Campos Faltantes: </p>`;
          resp.data.forEach((error) => {
            errors += `<div>${error}</div>`;
          });

          if (tipoUsuario == "Postulante") {
            this.validatedPostulante(errors);
          } else {
            this.validatedEmpresa(errors);
          }
          return false;
        }

        return true;
      })
    );
  }
}
