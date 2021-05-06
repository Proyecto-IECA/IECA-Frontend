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
        console.log(resp);
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

}
