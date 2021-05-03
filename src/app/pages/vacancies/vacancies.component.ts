import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service';
import { AuthResponseI } from '../../models/auth-response';
import { VacantesI } from '../../models/vacantes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VacantesFavI } from 'app/models/vacantes_favoritas';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

  listaVacantes: VacantesI[];
  

  slides = [{image: '1'}, {image: '2'}, {image: '3'}]

  constructor(
    private vacantesService: VacanciesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.vacantesService.getListaVacantes().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaVacantes = resp.data;
      }
    });
  }

  visualizar(idVacante) {
    this.router.navigate(['/postulate-vacancy', idVacante]);
  }

  markFavorite(vacante: VacantesI): void {
    this.vacantesService.markFavorite(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        vacante.Vacantes_Favoritas.push(resp.data);
        this.doneMassage("Vacante agregada a favoritas");
      }
    })
    // this.vacantesService.markFavorite(id_vacante);
  }

  unmarkFavorite(vacantesFav: VacantesFavI[]): void {
    this.vacantesService.unmarkFavorite(vacantesFav[0].id_vacante_favorita).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        vacantesFav.pop();
        this.doneMassage("Vacante eliminada de favoritas");
      }
    })
    // this.vacantesService.unmarkFavorite(id_vacante);
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
