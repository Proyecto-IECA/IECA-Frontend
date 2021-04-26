import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { VacantesI } from '../models/vacantes';
import { AuthResponseI } from '../models/auth-response';
import { UsuarioI } from '../models/usuario';

import { environment } from '../../environments/environment';
import { SucursalesI } from '../models/sucursales';



const baseUrl = environment.baseUrl + '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //  ---------- VARIABLES ---------- //
  private _company: UsuarioI;
  /*headers: HttpHeaders = new HttpHeaders({
    'x-token': localStorage.getItem('token'),
  });*/

  constructor(private http: HttpClient) {
    this.readCompany();
  }

  get getCompany(): UsuarioI {
    return { ...this._company };
  }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'x-token': localStorage.getItem('token'),
      'email': this.getCompany.email
    });
  }

  //  ---------- VACANTE CRUD ---------- //
  createVacante(form: VacantesI): Observable<AuthResponseI> {
    return;
  }

  readVacante(id?: number): Observable<AuthResponseI> {
    return;
  }

  updateVacante(form: VacantesI): Observable<AuthResponseI> {
    return;
  }

  deleteVacante(form: number): Observable<AuthResponseI> {
    return;
  }

  //  ---------- COMPANY CRUD ---------- //
  createCompany(form: any): Observable<AuthResponseI> {
    return;
  }

  readCompany(): Observable<any> {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/${id}`)
        .pipe( map(
            (response: AuthResponseI) => {
              this._company = response.data;
              return response;
            }));
  }

  updateCompany(form: any): Observable<any> {
    const id = localStorage.getItem('id_usuario');
    return this.http.put(`${baseUrl}/update/${id}`, form, { headers: this.headers });
  }

  deleteCompany(form: number): Observable<AuthResponseI> {
    return;
  }

  //  ---------- SUCURSALES CRUD ---------- //
  createBranches(form): Observable<any> {
    const id_usuario_fk = localStorage.getItem('id_usuario');

    // Agregamos 'id_usuario_fk' al cuerpo de la petición
    const body = {
      id_usuario_fk,
      ...form
    };

    return this.http.post(`${environment.baseUrl}/sucursales`, body);
  }

  readBranches(id_sucursal?: number): Observable<any> {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${environment.baseUrl}/sucursales/${id_sucursal}` || `${environment.baseUrl}/sucursales/${id}`);
  }

}
