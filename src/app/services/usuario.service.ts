import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { PeticionesService } from './peticiones.service';
import { Observable } from 'rxjs';
import { AuthResponseI } from '../models/auth-response';
import { UsuarioI } from '../models/usuario';
import { ExperienciaLaboralI } from '../models/experiencia_laboral';
import { ExperienciaAcademicaI } from '../models/experiencia_academica';
import { CursoCertificacionI } from '../models/cursos_certificaciones';
import { PerfilesPostulantesI } from '../models/perfiles_postulantes';
import { PerfilPostulanteI } from '../models/perfil_postulante';
import { HabilidadPostulanteI } from '../models/habilidades_postulante';
import { HabilidadesPostulantesI } from '../models/habilidades_postulantes';
import { ValorPostulanteI } from '../models/valor_postulante';
import { ValoresPostulantesI } from 'app/models/valores_postulantes';
import { IdiomaPostulanteI } from '../models/idioma_postulante';
import { IdiomasPostulantesI } from '../models/idiomas_postulantes';

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

  updateFoto(form: any): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'update-foto', form);
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

  // ------------------- PERFILES CRUD ---------------- //

  readPerfiles(): Observable<AuthResponseI> {
    return this.peticion.getQuery('perfiles');
  }

  readPerfilesPostulante(): Observable<AuthResponseI> {
    let id = this.usuario.id_postulante;
    return this.peticion.getQuery('perfiles', 'perfiles-postulante', id)
  }

  createPerfiles(perfiles: PerfilPostulanteI[]): Observable<AuthResponseI> {

    let perfilesPostulante: PerfilesPostulantesI = new PerfilesPostulantesI;
    perfilesPostulante.id_postulante = this.usuario.id_postulante;
    perfilesPostulante.perfiles = perfiles;

    return this.peticion.postQuery('perfiles', 'add', perfilesPostulante);
  }

  // ------------------- HABILIDADES CRUD ---------------- //

  readHabilidades(): Observable<AuthResponseI> {
    return this.peticion.getQuery('habilidades');
  }

  readHabilidadesPostulante(): Observable<AuthResponseI> {
    let id = this.usuario.id_postulante;
    return this.peticion.getQuery('habilidades', 'habilidades-postulante', id);
  }

  createHabilidades(habilidades: HabilidadPostulanteI[]): Observable<AuthResponseI> {

    let habilidadesPostulante: HabilidadesPostulantesI = new HabilidadesPostulantesI;
    habilidadesPostulante.id_postulante = this.usuario.id_postulante;
    habilidadesPostulante.habilidades = habilidades;

    return this.peticion.postQuery('habilidades', 'add', habilidadesPostulante);
  }

  // ------------------- VALORES CRUD ---------------- //

  readValores(): Observable<AuthResponseI> {
    return this.peticion.getQuery('valores');
  }

  readValoresPostulante(): Observable<AuthResponseI> {
    let id = this.usuario.id_postulante;
    return this.peticion.getQuery('valores', 'valores-postulante', id);
  }

  createValores(valores: ValorPostulanteI[]): Observable<AuthResponseI> {

    let valoresPostulante: ValoresPostulantesI = new ValoresPostulantesI;
    valoresPostulante.id_postulante = this.usuario.id_postulante;
    valoresPostulante.valores = valores;

    return this.peticion.postQuery('valores', 'add', valoresPostulante);
  }

    // ------------------- IDIOMAS CRUD ---------------- //

    readIdiomas(): Observable<AuthResponseI> {
      return this.peticion.getQuery('idiomas');
    }
  
    readIdiomasPostulante(): Observable<AuthResponseI> {
      let id = this.usuario.id_postulante;
      return this.peticion.getQuery('idiomas', 'idiomas-postulante', id);
    }
  
    createIdiomas(idiomas: IdiomaPostulanteI[]): Observable<AuthResponseI> {
  
      let idiomasPostulante: IdiomasPostulantesI = new IdiomasPostulantesI;
      idiomasPostulante.id_postulante = this.usuario.id_postulante;
      idiomasPostulante.idiomas = idiomas;
  
      return this.peticion.postQuery('idiomas', 'add', idiomasPostulante);
    }

}
