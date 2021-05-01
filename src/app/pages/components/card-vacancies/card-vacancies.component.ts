import { Component, Input, OnInit } from '@angular/core';
import { VacantesI } from '../../../models/vacantes';
import { VacanciesService } from '../../vacancies/vacancies.service';

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
  @Input() listaVacantes: VacantesI[];

  constructor(private vacantesService: VacanciesService) { }

  ngOnInit(): void {
  }

  markFavorite(id_vacante: number): void {
    console.log('Marcada como favorito');
    // this.vacantesService.markFavorite(id_vacante);
  }

  unmarkFavorite(id_vacante: number): void {
    console.log('Desmarcada como favorito');
    // this.vacantesService.unmarkFavorite(id_vacante);
  }

}
