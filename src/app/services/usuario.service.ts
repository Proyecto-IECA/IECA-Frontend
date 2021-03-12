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
    return this.peticion.putQuery(this.tipo, 'usuario', form);
  }

  //  ---------- EXPERIENCIA LABORAL CRUD ---------- //

  createExpLaboral(form: ExperienciaLaboralI): Observable<AuthResponseI> {
    return this.peticion.postQuery(this.tipo, 'expLaboral', form);
  }

  readExpLaboral(id: number): Observable<AuthResponseI> {
    return this.peticion.getQuery(this.tipo, 'expLaboral', id);
  }

  updateExpLaboral(form: ExperienciaLaboralI, id: number): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'expLaboral', form, id);
  }

  deleteExpLaboral(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery(this.tipo, 'expLaboral', id);
  }

  //  ---------- EXPERIENCIA ACADÉMICA CRUD ---------- //

  createExpAcademica(form: ExperienciaAcademicaI): Observable<AuthResponseI> {
    return this.peticion.postQuery(this.tipo, 'expAcademica', form);
  }

  readExpAcademica(id: number): Observable<AuthResponseI> {
    return this.peticion.getQuery(this.tipo, 'expAcademica', id);
  }

  updateExpAcademica(form: ExperienciaAcademicaI, id: number): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'expAcademica', form, id);
  }

  deleteExpAcademica(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery(this.tipo, 'expAcademica', id);
  }

  //  ---------- CURSO Y/O CERTIFICACION CRUD ---------- //

  createCurso(form: CursoCertificacionI): Observable<AuthResponseI> {
    return this.peticion.postQuery(this.tipo, 'curso', form);
  }

  readCurso(id: number): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'curso', id);
  }

  updateCurso(form: CursoCertificacionI, id: number): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'curso', form);
  }

  deleteCurso(id: number): Observable<AuthResponseI> {
    return this.peticion.deleteQuery(this.tipo, 'curso', id);
  }

}
