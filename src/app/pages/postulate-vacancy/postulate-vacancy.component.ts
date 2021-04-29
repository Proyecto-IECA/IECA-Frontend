import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacantesI } from '../../models/vacantes';
import { PostulateVacancyService } from './postulate-vacancy.service';
import { AuthResponseI } from '../../models/auth-response';

@Component({
  selector: 'app-postulate-vacancy',
  templateUrl: './postulate-vacancy.component.html',
  styleUrls: ['./postulate-vacancy.component.css']
})
export class PostulateVacancyComponent implements OnInit {
  
  idVacante: number; 
  vacante: VacantesI;
  constructor(
    private postulateVacancyService: PostulateVacancyService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idVacante = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.postulateVacancyService.getVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if(resp.status){
        this.vacante = resp.data;
      }
    });
  }

  postularme() {
    this.postulateVacancyService.addPostulante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        console.log(resp.data);
      }
    });
  }

}
