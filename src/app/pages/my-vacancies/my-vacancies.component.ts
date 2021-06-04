import { Component, OnInit } from '@angular/core';
import { VacantesI } from '../../models/vacantes';
import { MyVacanciesService } from './my-vacancies.service';
import { AuthResponseI } from '../../models/auth-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-vacancies',
  templateUrl: './my-vacancies.component.html',
  styleUrls: ['./my-vacancies.component.css']
})
export class MyVacanciesComponent implements OnInit {

  vacantesP: VacantesI[];
  vacantesB: VacantesI[];
  vacantesC: VacantesI[];
  vacantesD: VacantesI[];
  numVacantesP: number;
  numVacantesB: number;
  numVacantesC: number;
  numVacantesD: number;
  
  constructor(
    private myVacanciesService: MyVacanciesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myVacanciesService.getVacantes().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacantesP = resp.data.VacantesPublicadas;
        this.vacantesB = resp.data.VacantesBorradores;
        this.vacantesC = resp.data.VacantesCerradas;
        this.vacantesD = resp.data.VacantesDisponibles;
        this.numVacantesP = this.vacantesP.length;
        this.numVacantesB = this.vacantesB.length;
        this.numVacantesC = this.vacantesC.length;
        this.numVacantesD = this.vacantesD.length;
      }
    })
  }

  updateVacante(id) {
    this.router.navigate(['/update-vacancie', id]);
  }

  publicar(vacante) {
    this.myVacanciesService.publicarVacante(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Vacante públicada");
        let index = this.vacantesB.indexOf(vacante);
        let vacanteP = this.vacantesB.splice(index, 1);
        this.vacantesP.unshift(vacanteP[0]);
        this.numVacantesB = this.numVacantesB - 1;
        this.numVacantesP = this.numVacantesP + 1;
      }
    })
  }

  noPublicar(vacante) {
    this.myVacanciesService.noPublicarVacante(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Vacante no públicada");
        let index = this.vacantesP.indexOf(vacante);
        let vacanteB = this.vacantesP.splice(index, 1);
        this.vacantesB.unshift(vacanteB[0]);
        this.numVacantesP = this.numVacantesP - 1;
        this.numVacantesB = this.numVacantesB + 1;
      }
    })
  }

  cerrar(vacante) {
    this.myVacanciesService.cerrarVacante(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Vacante cerrada");
        let index = this.vacantesD.indexOf(vacante);
        let vacanteC = this.vacantesD.splice(index, 1);
        this.vacantesC.unshift(vacanteC[0]);
        this.numVacantesD = this.numVacantesD - 1;
        this.numVacantesC = this.numVacantesC + 1;
      }
    })
  }

  abrir(vacante) {
    this.myVacanciesService.abrirVacante(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Vacante abierta");
        let index = this.vacantesC.indexOf(vacante);
        let vacanteD = this.vacantesC.splice(index, 1);
        this.vacantesD.unshift(vacanteD[0]);
        this.numVacantesC = this.numVacantesC - 1;
        this.numVacantesD = this.numVacantesD + 1;
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
