import { Component, OnInit } from '@angular/core';
import { VacantesI } from '../../models/vacantes';
import { MyVacanciesService } from './my-vacancies.service';
import { AuthResponseI } from '../../models/auth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-vacancies',
  templateUrl: './my-vacancies.component.html',
  styleUrls: ['./my-vacancies.component.css']
})
export class MyVacanciesComponent implements OnInit {

  dataColumns: string[] = ['fecha_publicacion', 'puesto', 'nivel', 'modalidad', 'disponible', 'publicada', 'editar'];
  dataSource: VacantesI[];
  
  constructor(
    private myVacanciesService: MyVacanciesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myVacanciesService.getVacantes().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.dataSource = resp.data;
      }
    })
  }

  updateVacante(id) {
    this.router.navigate(['/update-vacancie', id]);
  }

}
