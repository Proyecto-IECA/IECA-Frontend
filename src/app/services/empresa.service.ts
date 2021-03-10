import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseI } from '../models/auth-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl + '/empresas';
  private email: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.email = this.authService.usuario.email;
    console.log(this.authService.usuario.email);
  }

  //  ---------- QUERY ---------- //
  private postQuery(accion: string, body: EmpresaI): Observable<AuthResponseI> {

    // Creación y asignación de valores de los headers
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token'),
      email: this.email
    });

    // Variable para la assignation de la URL completo
    const url = `${this.baseUrl}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.post<AuthResponseI>(url, body, { headers })
        .pipe(
            map(response => {
              console.log(response);
              return response;
            })
        );
  }

  private getQuery(accion: string, body?: EmpresaI | number): Observable<AuthResponseI> {

    // Creación y asignación de valores de los headers
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token'),
      email: this.email
    });

    // Variable para la assignation de la URL completo
    const url = `${this.baseUrl}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.get<AuthResponseI>(url, { headers })
        .pipe(
            map((response) => {
              console.log(response);
              return response;
            })
        );
  }

  private putQuery(accion: string, body: EmpresaI): Observable<AuthResponseI> {

    // Creación y asignación de valores de los headers
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token'),
      email: this.email
    });

    // Variable para la assignation de la URL completo
    const url = `${this.baseUrl}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.put<AuthResponseI>(url, body, { headers })
        .pipe(
            map((response) => {
              console.log(response);
              return response;
            })
        );
  }

  //  ---------- VACANTE CRUD ---------- //
  createVacante(form: any): Observable<any> {
    return this.postQuery('vacante', form);
  }

  readVacante(form: any): Observable<any> {
    return this.getQuery('vacante', form);
  }

  updateVacante(form: any): Observable<any> {
    return this.putQuery('vacante', form);
  }

  deleteVacante(form: number): Observable<any> {
    return this.getQuery('vacante', form);
  }
}
