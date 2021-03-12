import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PeticionesService } from './peticiones.service';
import { EmpresaI } from '../models/empresa';
import { UsuarioI } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //  ---------- VARIABLES ---------- //
  private tipo = 'empresas';
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
  createVacante(form: any): Observable<any> {
    return this.peticion.postQuery(this.tipo, 'vacante', form);
  }

  readVacante(form: any): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

  updateVacante(form: any): Observable<any> {
    return this.peticion.putQuery(this.tipo, 'vacante', form);
  }

  deleteVacante(form: number): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

  //  ---------- COMPANY CRUD ---------- //
  createCompany(form: any): Observable<any> {
    return this.peticion.postQuery(this.tipo, 'vacante', form);
  }

  readCompany(form: any): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

  updateCompany(form: any): Observable<any> {
    return this.peticion.putQuery(this.tipo, 'vacante', form);
  }

  deleteCompany(form: number): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

}
