import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PeticionesService } from './peticiones.service';
import { EmpresaI } from '../models/empresa';
import { VacantesI } from '../models/vacantes';
import { AuthResponseI } from '../models/auth-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //  ---------- VARIABLES ---------- //
  private _company: EmpresaI;

  constructor(private authService: AuthService,
              private peticion: PeticionesService) {

    if (localStorage.getItem('data')) {
      this._company = JSON.parse(localStorage.getItem('data'));
    }

    this._company = this.authService.usuario;

  }

  get company(): EmpresaI {
    return { ...this._company };
  }

  //  ---------- VACANTE CRUD ---------- //
  createVacante(form: VacantesI): Observable<AuthResponseI> {
    return this.peticion.postQuery('vacantes', 'add', form)
        .pipe(
            map(response => {
              console.log(response);
              return response;
            })
        );
  }

  readVacante(id?: number): Observable<AuthResponseI> {
    return this.peticion.getQuery('vacantes', '', id);
  }

  updateVacante(form: VacantesI): Observable<AuthResponseI> {
    return this.peticion.putQuery('vacantes', 'update', form);
  }

  deleteVacante(form: number): Observable<AuthResponseI> {
    return this.peticion.getQuery('vacantes', 'delete', form);
  }

  //  ---------- COMPANY CRUD ---------- //
  createCompany(form: any): Observable<any> {
    return this.peticion.postQuery('auth-postulantes', 'register', form);
  }

  readCompany(form: any): Observable<any> {
    return this.peticion.getQuery('empresas', 'vacante', form);
  }

  updateCompany(form: any): Observable<any> {
    return this.peticion.putQuery('empresas', 'update', form);
  }

  deleteCompany(form: number): Observable<any> {
    return this.peticion.getQuery('empresas', 'vacante', form);
  }

}
