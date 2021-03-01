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

  private email: string;
  private token: string;
  private refreshToken: string;

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
    // Declaracion de los headers
    /*const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-token', this.token);
    headers.append('email', this.email);*/

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.post<AuthResponseI>(url, body)
      .pipe(
        map(response => {
          this.email = response.data.email;
          this.token = response.token;
          this.refreshToken = response.refreshToken;
          return response;
        })
      );
  }

  private getQuery(tipo: string, accion: string, token?: string): any {
    if (token) {
      this.token = token;
    }
    // Declaracion de los headers
    /*const headers = new HttpHeaders();
    headers.append('x-token', this.token);*/

    // Variable para la assignation de la URL completo
    const url  = `${ this.baseUrl }/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.get<AuthResponseI>(url, { headers: { 'x-token': this.token } })
      .pipe(
        map((response) => {
          console.log(response);
          this.email = response.data.email;
          this.token = response.token;
          this.refreshToken = response.refreshToken;
          return response;
        })
      );
  }

  //  ---------- MÉTODOS GENERALES ---------- //
  logout(): void {
    localStorage.clear();
  }

  verificarEmail(email: string): Observable<AuthResponseI> {
    return this.postQuery('auth', 'send-email-password', email);
  }

  nuevoPassword(form: UsuarioI): Observable<AuthResponseI> {
    const body = {
      email: this.email,
      pass: form.pass,
    };

    // Variable para la assignation de la URL completa
    const url  = `${ this.baseUrl }/auth-postulantes/renew-pass`;
    return this.http.put<AuthResponseI>(url, body, {  });
  }

  validarToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth-postulantes/renew-token`;
    const headers = new HttpHeaders();
    headers.append('x-token', this.token);
    headers.append('email', this.email);
    /*const headers = new HttpHeaders(
      {Authorization: ['token' + localStorage.getItem('token'), 'email' + this.email]}
    );*/

    return this.http.get<AuthResponseI>( url, { headers } )
      .pipe(
        map( (resp) => {
          localStorage.setItem('token', resp.token!);
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

}
