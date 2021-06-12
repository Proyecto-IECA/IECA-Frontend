import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VacantesI } from '../../models/vacantes';
import { PostulateVacancyService } from './postulate-vacancy.service';
import { AuthResponseI } from '../../models/auth-response';
import Swal from 'sweetalert2';
import { GuardsService } from '../../services/guards.service';

@Component({
  selector: 'app-postulate-vacancy',
  templateUrl: './postulate-vacancy.component.html',
  styleUrls: ['./postulate-vacancy.component.css']
})
export class PostulateVacancyComponent implements OnInit {

  idVacante: number;
  idUsuario: number;
  idCompany: number;
  nombre: string;
  puesto: string;
  vacante: VacantesI;
  postulacion = true;
  activedPostulacion = true;
  idPostulacion: number;
  pendiente = true;
  aceptada = false;
  rechazada = false;

  constructor(
    private postulateVacancyService: PostulateVacancyService,
    private activatedRoute: ActivatedRoute,
    private guardService: GuardsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idVacante = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.guardService.validarPerfil().subscribe((resp: AuthResponseI) => {
      if (!resp.status) {
        let errors = `<p>Campos Faltantes: </p>`;
        resp.data.forEach((error) => {
          errors += `<div>${error}</div>`;
        });

        this.validatedPostulante(errors);
      }
    });

    this.postulateVacancyService.getUsuario().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.idUsuario = resp.data.id_usuario;
        this.nombre = resp.data.nombre + ' ' + resp.data.apellido_paterno + ' ' + resp.data.apellido_materno;
      }
    })

    this.postulateVacancyService.getVacante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.vacante = resp.data;
        this.puesto = resp.data.puesto;
        this.idCompany = resp.data.id_usuario_fk;
      }
    });

    this.postulateVacancyService.getPostulacion(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        if (resp.data != null) {
          this.idPostulacion = resp.data.id_postulacion;          
          this.postulacion = false;
          this.aceptada = resp.data.aceptada;
          this.rechazada = resp.data.rechazada;
          
          if (this.aceptada == true || this.rechazada == true) {
            this.pendiente = false;
            this.verComentario(resp.data.titulo, resp.data.comentario);
          }

        } else {
          this.postulacion = true;
        }
      }
    });

  }

  validarPerfil() {
    this.guardService.validarPerfil().subscribe((resp: AuthResponseI) => {
      if (!resp.status) {
        let errors = `<p>Campos Faltantes: </p>`;
        resp.data.forEach((error) => {
          errors += `<div>${error}</div>`;
        });

        this.validatedPostulante(errors);
      } else {
        this.confirmarPostulacion();
      }
    })
  }

  postularme() {
    this.postulateVacancyService.addPostulante(this.idVacante).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.idPostulacion = resp.data.id_postulacion;
        this.doneMassage('Éxito al postularse');
        this.postulacion = false;
        this.addNotificacion('se postulo a tu vacante', 1);
      }
    });
  }

  cancelarPostulacion() {
    this.postulateVacancyService.cancelarPostulacion(this.idPostulacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.doneMassage('Se cancelo tu postulación');
        this.postulacion = true;
        this.addNotificacion('cancelo su postulacion', 2)
      }
    });
  }

  verComentario(titulo, comentario) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: comentario,
      timer: 3600
    })
  }

  addNotificacion(status, tipo) {
    let url = ''; 
    if (tipo == 1) {
      url = '/see-profile/' + this.idPostulacion;
    } else {
      url = '/my-vacancies';
    }
    let titulo = this.nombre + ' ' + status;
    let mensaje = this.nombre + ' ' + status + ' para el puesto de ' + this.puesto;
    this.postulateVacancyService.addNotificacion(url, titulo, mensaje, this.idPostulacion, this.idCompany).subscribe((resp: AuthResponseI) => {
      if (!resp.status) {
        console.log(resp);
      }
    });
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

  validatedPostulante(errors): void {
    Swal.fire({
      icon: "info",
      title: "Para poder postularte completa tu perfil",
      html: errors,
      showCancelButton: true,
      cancelButtonText: "Entendido",
      confirmButtonText: "Completarlo Ahora!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/user-profile');
      }
    });
  }



  confirmarPostulacion() {
    Swal.fire({
      icon: 'info',
      title: "¿Estas seguro que deseas postularte a esta vacante?",
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postularme();
      }
    })
  }

  confirmarCancelarPostulacion() {
    Swal.fire({
      icon: 'info',
      title: "¿Estas seguro que deseas cancelar tu postulacion?",
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelarPostulacion();
      }
    })
  }

}
