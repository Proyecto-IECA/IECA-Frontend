import { Component, OnInit } from '@angular/core';
import { VacanciesService } from './vacancies.service';
import { AuthResponseI } from '../../models/auth-response';
import { VacantesI } from '../../models/vacantes';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VacantesFavI } from 'app/models/vacantes_favoritas';
import { PageEvent } from '@angular/material/paginator';
import { PerfilI } from '../../models/perfil';


@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {
  
  page_size: number = 5;
  page_number: number = 1;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  vacantesRecientes: VacantesI[];
  vacantesRecomendadas: VacantesI[];
  vacantes: VacantesI[] = [];
  perfiles: PerfilI[];

  filtered = {
    fecha: "DESC",
    filter_perfiles: false,
    perfiles: []
  }

  slides = [{image: '1'}, {image: '2'}, {image: '3'}]

  constructor(
    private vacantesService: VacanciesService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.vacantesService.getVacantesRecientes().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacantesRecientes = resp.data;
      }
    });
  
    this.vacantesService.getVacantesRecomendadas().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacantesRecomendadas = resp.data;
      }
    });

    this.vacantesService.getVacantes(this.filtered).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacantes = resp.data;
      }
    });

    this.vacantesService.getPerfilesUsuario().subscribe((resp: AuthResponseI) => {
      console.log(resp);
      if (resp.status) {
        this.perfiles = resp.data;
      }
    });
    
  }

  visualizar(idVacante) {
    this.router.navigate(['/postulate-vacancy', idVacante]);
  }

  markFavorite(vacante: VacantesI): void {
    console.log(vacante);
    this.vacantesService.markFavorite(vacante.id_vacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        console.log(resp);
        vacante.Vacantes_Favoritas.push(resp.data);
        this.doneMassage("Vacante agregada a favoritas");
      }
    })

    // this.vacantesService.markFavorite(id_vacante);
  }

  unmarkFavorite(vacantesFav: VacantesFavI[]): void {
    console.log(vacantesFav);
    this.vacantesService.unmarkFavorite(vacantesFav[0].id_vacante_favorita).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        vacantesFav.pop();
        this.doneMassage("Vacante eliminada de favoritas");
      }
    })
    // this.vacantesService.unmarkFavorite(id_vacante);
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
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
