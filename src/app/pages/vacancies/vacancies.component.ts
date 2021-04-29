import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service';
import { AuthResponseI } from '../../models/auth-response';
import { VacantesI } from '../../models/vacantes';
import { Router } from '@angular/router';

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

}
