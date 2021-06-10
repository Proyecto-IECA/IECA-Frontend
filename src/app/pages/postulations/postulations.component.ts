import { Component, OnInit } from '@angular/core';
import { PostulationsService } from './postulations.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostulacionI } from 'app/models/postulacion';
import { AuthResponseI } from 'app/models/auth-response';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.css']
})
export class PostulationsComponent implements OnInit {
  
  page_size: number = 6;
  page_number: number = 1;
  pageSizeOptions: number[] = [6, 12, 24, 48, 96];
  idVacante: number;
  tipo: number;
  ruta = '/';
  postulantes: PostulacionI[] = [];
  
  constructor(
    private postulationsService: PostulationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPostulantes();
  }

  getPostulantes() {
    this.idVacante = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.tipo = parseInt(this.activatedRoute.snapshot.paramMap.get('tipo'));
    if (this.tipo == 1) {
      this.ruta += 'my-vacancies';
    } else {
      this.ruta += 'update-vacancie/'+this.idVacante;
    }

    this.postulationsService.getPostulantesVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.postulantes = resp.data.Postulaciones;
        console.log(this.postulantes);
      }
    })
  }

  aceptarPostulacion(idPostulacion) {
    this.postulationsService.aceptarPostulacion(idPostulacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Acepto al postulante");
        this.getPostulantes();
      }
    })
  }

  rechazarPostulacion(idPostulacion) {
    this.postulationsService.rechazarPostulacion(idPostulacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage("Rechazo al postulante");
        this.getPostulantes();
      }
    })
  }


  verPerfil(idPostulacion) {
    this.router.navigate(['/see-profile', idPostulacion]);
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  confirmarAceptarPostulacion(idPostulacion) {
    Swal.fire({
      icon: 'info',
      title: "¿Estas seguro que deseas aceptar al postulante?",
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.aceptarPostulacion(idPostulacion);
      }
    })
  }

  confirmarRechazarPostulacion(idPostulacion) {
    Swal.fire({
      icon: 'info',
      title: "¿Estas seguro que deseas rechazar al postulante?",
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rechazarPostulacion(idPostulacion);
      }
    })
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
