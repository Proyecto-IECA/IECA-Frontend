import { Component, Input, OnInit } from '@angular/core';
import { VacanciesService } from 'app/pages/vacancies/vacancies.service';
import { VacantesFavI } from '../../../models/vacantes_favoritas';
import { AuthResponseI } from '../../../models/auth-response';
import Swal from 'sweetalert2';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
  selector: 'app-card-vacancies',
  templateUrl: './card-vacancies.component.html',
  styles: [ `
    .cursor {
      cursor:pointer;
    }
  `]
})
export class CardVacanciesComponent implements OnInit {

  /* * ----- INPUT ----- */
  @Input() listaVacantes: VacantesFavI[];

  constructor(
    private vacantesService: VacanciesService,
    private vacantesFavService: FavoritesService
    ) { }

  ngOnInit(): void {
  }

  unmarkFavorite(idVacanteFav: number): void {
    this.vacantesService.unmarkFavorite(idVacanteFav).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacantesFavService.getVacantesFav().subscribe((resp: AuthResponseI) => {
          this.listaVacantes = resp.data.Vacantes_Favoritas;
        })
        this.doneMassage("Vacante eliminada de favoritas");
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
