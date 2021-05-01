import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VacantesI } from '../../models/vacantes';

import { VacanciesService } from '../vacancies/vacancies.service';
import { AuthResponseI } from '../../models/auth-response';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ]
})
export class FavoritesComponent implements OnInit {

  /* ? ----- VARIABLES ----- */
  listaVacantes: VacantesI[];
  slides = [{image: '1'}, {image: '2'}, {image: '3'}]

  constructor(private vacantesService: VacanciesService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  /* ? ----- METODOS ----- */
  loadData(): void {
    this.vacantesService.getListaVacantes().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaVacantes = resp.data;
      }
    });
  }

}
