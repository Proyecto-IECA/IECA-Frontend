import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioI;
  private _empresa!: EmpresaI;
  userToken: string;

  get usuario() {
    return { ...this._usuario };
  }

  get empresa() {
    return { ...this._empresa };
  }

  constructor(private http: HttpClient) {
    this.userToken = '';
  }

  logout(): void {
    localStorage.clear();
  }

  loginUsuario(email: string, password: string): any {
    const url  = `${ this.baseUrl }/usuario/auth`;
    const body = { email, password };

    return this.http.post<UsuarioI>(url, body);
  }

  loginEmpresa(email: string, password: string): any {
    const url  = `${ this.baseUrl }/empresa/auth`;
    const body = { email, password };

    return this.http.post<EmpresaI>(url, body);
  }

  registroUsuario(form: UsuarioI): any {
    const url  = `${ this.baseUrl }/usuario/register`;

    return this.http.post<UsuarioI>(url, form);
  }

  registroEmpresa(form: EmpresaI): any {
    const url  = `${ this.baseUrl }/empresa/register`;

    return this.http.post<EmpresaI>(url, form);
  }

  validarToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get<any>( url, { headers } )
      /*.pipe(
        map( resp => {
          localStorage.setItem('token', resp.token! );
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }

          return resp.ok;
        }),
        catchError( err => of(false) )
      )*/;
  }

}
