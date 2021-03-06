import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, pipe } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';
import { AuthResponseI } from '../models/auth-response';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  // tslint:disable-next-line:variable-name
  private _usuario!: UsuarioI | EmpresaI;

  private email: string;
  private refreshToken: string;

  get usuario(): UsuarioI {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient,
              private router: Router) {
    // this.tipo = 0; // Tipo = 1 = Postulante | tipo = 2 = Empresa
    this.email = '';
    this.refreshToken = '';
    localStorage.setItem('tipo', '');
    localStorage.setItem('token', '');
  }

  //  ---------- QUERY ---------- //
  private postQuery(tipo: string, accion: string, body: UsuarioI | EmpresaI | { email: string }): Observable<AuthResponseI> {

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.post<AuthResponseI>(url, body, { headers: { 'x-token' : localStorage.getItem('token') } })
      .pipe(
        map(response => {
          console.log(response);
          if (response.data) {
            localStorage.setItem('token', response.token);
            this.email = response.data.email;
            this.refreshToken = response.refreshToken;
            this._usuario = response.data;
          }
          return response;
        })
      );
  }

  private getQuery(tipo: string, accion: string, token?: string): any {

    // Si recibimos el token de parametro lo asignamos a nuestro token
    if (token) {
      localStorage.setItem('token', token);
    }

    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token'),
      email: this.email
    });

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.get<AuthResponseI>(url, { headers })
      .pipe(
        map((response) => {
          console.log(response);
          if (response.data) {
            localStorage.setItem('token', token);
            this.email = response.data.email;
            this.refreshToken = response.refreshToken;
            this._usuario = response.data;
          }
          return response;
        })
      );
  }

  private putQuery(tipo: string, accion: string, body: UsuarioI | EmpresaI, token: string): any {

    // Si recibimos el token de parametro lo asignamos a nuestro token
    if (token) {
      localStorage.setItem('token', token);
    }

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.put<AuthResponseI>(url, body, { headers: { 'x-token': localStorage.getItem('token') } })
      .pipe(
        map((response) => {
          console.log(response);
          if (response.data) {
            localStorage.setItem('token', token);
            this.email = response.data.email;
            this.refreshToken = response.refreshToken;
            this._usuario = response.data;
          }
          return response;
        })
      );
  }

  //  ---------- VALIDADORES ---------- //
  validarToken(): Observable<boolean> {
    const tipo = localStorage.getItem('tipo');
    if (tipo === '1') {
      return this.getQuery('auth-postulantes', 'renew-token')
        .pipe(
          map(() => {
            const token = localStorage.getItem('token');
            if (!token) {
              return false;
            }
            return true;
          }));
    }
    if (tipo === '2') {
      return this.getQuery('auth-empresas', 'renew-token')
        .pipe(
          map(() => {
            const token = localStorage.getItem('token');
            if (!token) {
              return false;
            }
            return true;
          }));
    }

    this.router.navigateByUrl('/auth');
  }

  validarEmailValidado(): Observable<boolean> {
    const tipo = localStorage.getItem('tipo');
    if (tipo === '1') {
      return this.getQuery('auth-postulantes', 'renew-token')
        .pipe(
          map((response: AuthResponseI) => {
            if (response.data.email_validado){
              return true;
            }
            return false;
          }));
    }
    if (tipo === '2') {
      return this.getQuery('auth-empresas', 'renew-token')
        .pipe(
          map((response: AuthResponseI) => {
            if (response.data.email_validado){
              return true;
            }
            return false;
          }));
    }

    this.router.navigateByUrl('/auth');
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

  //  ---------- ASPIRANTE | USUARIO | POSTULANTE ---------- //
  loginUsuario(form: UsuarioI): Observable<AuthResponseI>  {
    localStorage.setItem('tipo', '1');
    return this.postQuery('auth-postulantes', 'login', form);
  }

  registroUsuario(form: UsuarioI): Observable<AuthResponseI> {
    console.log(form);
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
    localStorage.setItem('tipo', '2');
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
