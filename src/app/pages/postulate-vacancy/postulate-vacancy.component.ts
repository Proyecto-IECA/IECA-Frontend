import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacantesI } from '../../models/vacantes';
import { PostulateVacancyService } from './postulate-vacancy.service';
import { AuthResponseI } from '../../models/auth-response';
import Swal from 'sweetalert2';
import { GuardsService } from '../../services/guards.service';

@Component({
  selector: 'app-postulate-vacancy',
  templateUrl: './postulate-vacancy.component.html',
  styleUrls: ['./postulate-vacancy.component.css']
})
export class PostulateVacancyComponent implements OnInit {

  idVacante: number;
  vacante: VacantesI;
  postulacion = true;

  constructor(
    private postulateVacancyService: PostulateVacancyService,
    private activatedRoute: ActivatedRoute,
    private guardService: GuardsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idVacante = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postulateVacancyService.getVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacante = resp.data;
      }
    });

    this.postulateVacancyService.getPostulacion(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        if (resp.data != null) {
          this.postulacion = false;
        } else {
          this.postulacion = true;
        }
      }
    });
  }

  postularme() {
    this.guardService.validarPerfil().subscribe((resp: AuthResponseI) => {
      if (!resp.status) {
        let errors = `<p>Campos Faltantes: </p>`;
        resp.data.forEach((error) => {
          errors += `<div>${error}</div>`;
        });

        this.validatedPostulante(errors);
      
      } else {
        this.postulateVacancyService.addPostulante(this.idVacante).subscribe((resp: AuthResponseI) => {
          if (resp.status) {
            this.doneMassage('Éxito al postularse');
          }
        });
      }
    })
  }

  doneMassage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Cambios Actualizados',
      text: message,
      showConfirmButton: false,
      timer: 2700
    });
  }

  validatedPostulante(errors): void {
    Swal.fire({
      icon: "info",
      title: "Para poder postularte completa tu perfil",
      html: errors,
      confirmButtonText: "Completarlo Ahora!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/user-profile');
      }
    });
  }

}
