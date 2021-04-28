import { Component, Input, OnInit } from '@angular/core';
import { VacantesI } from '../../models/vacantes';
import { UpdateVacancieService } from './update-vacancie.service';
import { PerfilI } from '../../models/perfil';
import { AuthResponseI } from '../../models/auth-response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-vacancie',
  templateUrl: './update-vacancie.component.html',
  styleUrls: ['./update-vacancie.component.css']
})
export class UpdateVacancieComponent implements OnInit {

  @Input() vacante: VacantesI;
  idVacante: number;
  perfiles: PerfilI[];
  
  constructor(
    private updateVacanteService: UpdateVacancieService,
    private activetedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idVacante = parseInt(this.activetedRoute.snapshot.paramMap.get('id'));

    this.updateVacanteService.getPerfilesVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.perfiles = resp.data;
      }
    })

  }

}
