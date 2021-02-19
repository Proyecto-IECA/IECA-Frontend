import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponseI } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  private _usuario!: UsuarioI;
  private _empresa!: EmpresaI;
  userToken: string;

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
