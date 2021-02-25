import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';
import { AuthResponseI } from '../models/auth-response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioI;
  private _empresa!: EmpresaI;
  userToken: string;
  public email;

  get usuario(): UsuarioI {
    return { ...this._usuario };
  }

  get empresa(): EmpresaI {
    return { ...this._empresa };
  }

  constructor(private http: HttpClient) {
    this.userToken = '';
  }

  logout(): void {
    localStorage.clear();
  }

  public email ;
  loginUsuario(form: UsuarioI): Observable<AuthResponseI>  {
    const url  = `${ this.baseUrl }/auth-postulantes/login`;
    return this.http.post<AuthResponseI>(url, form);
  }

  registroUsuario(form: UsuarioI): Observable<AuthResponseI> {
    const url  = `${ this.baseUrl }/auth-postulantes/register`;
    return this.http.post<AuthResponseI>(url, form);
  }

  loginEmpresa(form: EmpresaI): Observable<AuthResponseI> {
    const url  = `${ this.baseUrl }/auth-empresas/login`;
    return this.http.post<AuthResponseI>(url, form);
  }

  registroEmpresa(form: EmpresaI): Observable<AuthResponseI> {
    const url  = `${ this.baseUrl }/auth-empresas/register`;
    return this.http.post<AuthResponseI>(url, form);
  }

  validarToken(): Observable<boolean> {
<<<<<<< HEAD
    const url = `${ this.baseUrl }/auth-postulantes/renew-token`;
    const token = localStorage.getItem('token') || '';
    
    return this.http.get<AuthResponseI>( url, { 
      headers: {
        'x-token': localStorage.getItem('x-token'),
        'email': this.email
      }
     })
=======
    const url = `${ this.baseUrl }/auth-postulante/renew-token`;
    const headers = new HttpHeaders(
      {Authorization: ['token' + localStorage.getItem('token'), 'email' + this.email]}
    );
      /* .set('x-token', [localStorage.getItem('token')] || '' ); */
      /* ({'x-token': localStorage.getItem('token')},{'email': this.email}); */

    return this.http.get<AuthResponseI>( url, { headers } )
>>>>>>> 36f7559ac32edc038b2bed72adb27d65cdd71a56
      .pipe(
        map( (resp) => {
          console.log(resp);
          localStorage.setItem('x-token', resp.token!);
          localStorage.setItem('refreshToken', resp.refreshToken!);
          return resp.status;
        }),
        catchError( err => of(false) )
      );
  }

}
