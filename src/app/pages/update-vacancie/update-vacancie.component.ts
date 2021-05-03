import { Component, Input, OnInit } from '@angular/core';
import { VacantesI } from '../../models/vacantes';
import { UpdateVacancieService } from './update-vacancie.service';
import { PerfilI } from '../../models/perfil';
import { AuthResponseI } from '../../models/auth-response';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulacionI } from '../../models/postulacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-vacancie',
  templateUrl: './update-vacancie.component.html',
  styleUrls: ['./update-vacancie.component.css']
})
export class UpdateVacancieComponent implements OnInit {

  @Input() vacante: VacantesI;
  idVacante: number;
  perfiles: PerfilI[];
  postulantes: PostulacionI[];
  
  constructor(
    private updateVacanteService: UpdateVacancieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idVacante = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.updateVacanteService.getPerfilesVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.perfiles = resp.data;
      }
    })

    this.updateVacanteService.getPostulantesVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.postulantes = resp.data.Postulaciones;
      }
    })
  }

  verPerfil(idUsuario) {
    this.router.navigate(['/see-profile', idUsuario]);
  }

  aceptarPostulacion(idPostulacion) {
    this.updateVacanteService.aceptarPostulacion(idPostulacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Acepto al postulante");
      }
    })
  }

  rechazarPostulacion(idPostulacion) {
    this.updateVacanteService.rechazarPostulacion(idPostulacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Rechazo al postulante");
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
}
