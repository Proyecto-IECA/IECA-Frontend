import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseI } from '../models/auth-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  private email: string = this.authService.usuario.email;

  // Creación y asignación de valores de los headers
  headers = new HttpHeaders({
    'x-token': localStorage.getItem('token'),
    email: this.email
  });

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  //  ---------- QUERY ---------- //
  postQuery(tipo: string, accion: string, body: any): Observable<any> {

      // Asignamos los headers a una variable local
      const headers = this.headers

    // Variable para la assignation de la URL completo
    const url = `${this.baseUrl}/${tipo}/${accion}`;

    // Petition http con la URL completa agregando los headers
    return this.http.post<AuthResponseI>(url, body, { headers })
        .pipe(
            map(response => {
              console.log(response);
              return response;
            })
        );
  }

  getQuery(tipo: string, accion: string, id?: number): Observable<any> {

      // Asignamos los headers a una variable local
      const headers = this.headers

    // Variable para la assignation de la URL completo
    const url = `${this.baseUrl}/${tipo}/${accion}/${id}`;

    // Petition http con la URL completa agregando los headers
    return this.http.get<AuthResponseI>(url, { headers }, )
        .pipe(
            map((response) => {
              console.log(response);
              return response;
            })
        );
  }

  putQuery(tipo: string, accion: string, body: any, id?: number): Observable<any> {

    let url = "";
    if(!id){
      // Variable para la assignation de la URL completo
    url = `${this.baseUrl}/${tipo}/${accion}`;
    } else {
      // Variable para la assignation de la URL completo
    url = `${this.baseUrl}/${tipo}/${accion}/${id}`;
    }
      // Asignamos los headers a una variable local
      const headers = this.headers;

    // Petition http con la URL completa agregando los headers
    return this.http.put<AuthResponseI>(url, body, { headers })
        .pipe(
            map((response) => {
              console.log(response);
              return response;
            })
        );
  }

  deleteQuery(tipo: string, accion: string, id?: number): Observable<any> {

    // Asignamos los headers a una variable local
    const headers = this.headers

  // Variable para la assignation de la URL completo
  const url = `${this.baseUrl}/${tipo}/${accion}/${id}`;

  // Petition http con la URL completa agregando los headers
  return this.http.delete<AuthResponseI>(url, { headers }, )
      .pipe(
          map((response) => {
            console.log(response);
            return response;
          })
      );
}


}
