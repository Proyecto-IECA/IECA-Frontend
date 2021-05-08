import { Component, OnInit } from '@angular/core';
import { MyPostulationsService } from './my-postulations.service';
import { AuthResponseI } from '../../models/auth-response';
import { PostulacionI } from '../../models/postulacion';
import { UsuarioI } from '../../models/usuario';

@Component({
  selector: 'app-my-postulations',
  templateUrl: './my-postulations.component.html',
  styleUrls: ['./my-postulations.component.css']
})
export class MyPostulationsComponent implements OnInit {

  postulaciones: PostulacionI[];
  nAceptadas: number = 0;
  nRechazadas: number = 0;
  nPendientes: number = 0;

  constructor(private mypostulationService: MyPostulationsService) { }

  ngOnInit(): void {
    this.mypostulationService.getMisPostulaciones().subscribe((resp: AuthResponseI) => {
      if(resp.status) {
        this.postulaciones = resp.data;     
        this.postulaciones.forEach(postulacion => {
          if(postulacion.rechazada == false && postulacion.aceptada == false ){
            this.nPendientes = this.nPendientes + 1;
          } else if (postulacion.rechazada == true) {
            this.nRechazadas = this.nRechazadas + 1;
          } else if (postulacion.aceptada == true) {
            this.nAceptadas = this.nAceptadas + 1;
          }
        });
      }
    });
  }

  statusVacante(status) {
    if (status == 1) return true;
    return false;
  }


}
