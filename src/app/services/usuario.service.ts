import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PeticionesService } from './peticiones.service';
import { Observable } from 'rxjs';
import { AuthResponseI } from '../models/auth-response';
import { UsuarioI } from '../models/usuario';
import { ExperienciaLaboralI } from '../models/experiencia_laboral';
import { ExperienciaAcademicaI } from '../models/experiencia_academica';
import { CursoCertificacionI } from '../models/cursos_certificaciones';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //  ---------- VARIABLES ---------- //
  private tipo = 'postulantes';
  private _usuario: UsuarioI;


  constructor(private authService: AuthService,
    private peticion: PeticionesService) {

    if (localStorage.getItem('data')) {
      this._usuario = JSON.parse(localStorage.getItem('data'));
    }

    this._usuario = authService.usuario;
  }

  get usuario(): UsuarioI {
    return { ...this._usuario };
  }

  //  ---------- USUARIO CRUD ---------- //

  readUsuario(): Observable<AuthResponseI> {
    let id = this.usuario.id_postulante;
    return this.peticion.getQuery(this.tipo, 'perfil-completo', id);
  }

  updateUsuario(form: UsuarioI): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'update', form);
  }

  //  ---------- EXPERIENCIA LABORAL CRUD ---------- //

  createExpLaboral(form: ExperienciaLaboralI): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.postQuery('experiencias-laborales', 'add', form);
  }

  readExpLaboral(id: number): Observable<AuthResponseI> {
    return this.peticion.getQuery(this.tipo, 'expLaboral', id);
  }

  updateExpLaboral(form: ExperienciaLaboralI, id: number): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.putQuery('experiencias-laborales', 'update', form, id);
  }

  deleteExpLaboral(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery('experiencias-laborales', 'delete', this.usuario.id_postulante, id);
  }

  //  ---------- EXPERIENCIA ACADÉMICA CRUD ---------- //

  createExpAcademica(form: ExperienciaAcademicaI): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.postQuery('experiencias-academicas', 'add', form);
  }

  readExpAcademica(id: number): Observable<AuthResponseI> {
    return this.peticion.getQuery(this.tipo, 'expAcademica', id);
  }

  updateExpAcademica(form: ExperienciaAcademicaI, id: number): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.putQuery('experiencias-academicas', 'update', form, id);
  }

  deleteExpAcademica(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery('experiencias-academicas', 'delete', this.usuario.id_postulante, id);
  }

  //  ---------- CURSO Y/O CERTIFICACION CRUD ---------- //

  createCurso(form: CursoCertificacionI): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.postQuery('cursos-certificaciones', 'add', form);
  }

  readCurso(id: number): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'curso', id);
  }

  updateCurso(form: CursoCertificacionI, id: number): Observable<AuthResponseI> {
    form.id_postulante = this.usuario.id_postulante;
    return this.peticion.putQuery('cursos-certificaciones', 'update', form, id);
  }

  deleteCurso(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery('cursos-certificaciones', 'delete', this.usuario.id_postulante, id);
  }

}
