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
<<<<<<< HEAD
  userToken: string;
  public email;
=======

  private email: string;
  private token: string;
  private refreshToken: string;
>>>>>>> main

  get usuario(): UsuarioI {
    return { ...this._usuario };
  }

  get empresa(): EmpresaI {
    return { ...this._empresa };
  }

  constructor(private http: HttpClient) {
    this.email = '';
    this.token = '';
    this.refreshToken = '';
  }

  //  ---------- QUERY ---------- //
  private postQuery(tipo: string, accion: string, body: UsuarioI | EmpresaI | string): Observable<AuthResponseI> {

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.post<AuthResponseI>(url, body, { headers: { 'x-token' : this.token } })
      .pipe(
        map(response => {
          console.log(response);
          if (response.data) {
            this.email = response.data.email;
            this.token = response.token;
            this.refreshToken = response.refreshToken;
          }
          return response;
        })
      );
  }

  private getQuery(tipo: string, accion: string, token?: string): any {

    // Si recibimos el token de parametro lo asignamos a nuestro token
    if (token) {
      this.token = token;
    }

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.get<AuthResponseI>(url, { headers: { 'x-token': this.token } })
      .pipe(
        map((response) => {
          console.log(response);
          if (response.data) {
            this.email = response.data.email;
            this.token = response.token;
            this.refreshToken = response.refreshToken;
          }
          return response;
        })
      );
  }

  private putQuery(tipo: string, accion: string, body: UsuarioI | EmpresaI, token: string): any {

    // Si recibimos el token de parametro lo asignamos a nuestro token
    if (token) {
      this.token = token;
    }

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.put<AuthResponseI>(url, body, { headers: { 'x-token': this.token } })
      .pipe(
        map((response) => {
          console.log(response);
          if (response.data) {
            this.email = response.data.email;
            this.token = response.token;
            this.refreshToken = response.refreshToken;
          }
          return response;
        })
      );
  }

  //  ---------- MÉTODOS GENERALES ---------- //
  logout(): void {
    localStorage.clear();
  }

  verificarEmail(email: string): Observable<AuthResponseI> {

    // Asignar el email a un cuerpo JSON
    const body = {
      email
    };

    return this.postQuery('auth', 'send-email-password', body);
  }

  validarToken(): Observable<boolean> {
<<<<<<< HEAD
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
=======
    const url = `${ this.baseUrl }/auth-postulantes/renew-token`;
    const headers = new HttpHeaders();
    headers.append('x-token', this.token);
    headers.append('email', this.email);
    /*const headers = new HttpHeaders(
>>>>>>> main
      {Authorization: ['token' + localStorage.getItem('token'), 'email' + this.email]}
    );*/

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

  //  ---------- ASPIRANTE | USUARIO | POSTULANTE ---------- //
  loginUsuario(form: UsuarioI): Observable<AuthResponseI>  {
    return this.postQuery('auth-postulantes', 'login', form);
  }

  registroUsuario(form: UsuarioI): Observable<AuthResponseI> {
    return this.postQuery('auth-postulantes', 'register', form);
  }

  validarEmailUsuario(token: string): Observable<AuthResponseI> {
    return this.getQuery('auth-postulantes', 'valid-email', token);
  }

  renewPasswordUsuario(form: UsuarioI, token: string): Observable<AuthResponseI> {
    return this.putQuery('auth-postulantes', 'renew-pass', form, token);
  }

  //  ---------- EMPRESA ---------- //
  loginEmpresa(form: EmpresaI): Observable<AuthResponseI> {
    return this.postQuery('auth-empresas', 'login', form);
  }

  registroEmpresa(form: EmpresaI): Observable<AuthResponseI> {
    const url  = `${ this.baseUrl }/auth-empresas/register`;
    return this.http.post<AuthResponseI>(url, form);
  }

  validarEmailEmpresa(token: string): Observable<AuthResponseI> {
    return this.getQuery('auth-empresas', 'valid-email', token);
  }

  renewPasswordEmpresa(form: EmpresaI, token: string): Observable<AuthResponseI> {
    return this.putQuery('auth-empresas', 'renew-pass', form, token);
  }

}
