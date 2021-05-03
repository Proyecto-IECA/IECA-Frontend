import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthResponseI } from '../../models/auth-response';
import { FavoritesService } from './favorites.service';
import { VacantesFavI } from '../../models/vacantes_favoritas';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styles: [
  ]
})
export class FavoritesComponent implements OnInit {

  /* ? ----- VARIABLES ----- */
  listaVacantes: VacantesFavI[];
  slides = [{image: '1'}, {image: '2'}, {image: '3'}]

  constructor(private vacantesFavService: FavoritesService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  /* ? ----- METODOS ----- */
  loadData(): void {
    this.vacantesFavService.getVacantesFav().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.listaVacantes = resp.data.Vacantes_Favoritas;
      }
    });
  }

}
