import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl + '/vacantes'

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  private id_usuario = localStorage.getItem('id_usuario');

  constructor(private http: HttpClient) {
  }

  getListaVacantes () {
    return this.http.get(`${baseUrl}`);
  }

  getFavotires(): Observable<any> {
    return this.http.get(`${baseUrl}/${this.id_usuario}`);
  }

  markFavorite(id_vacante: number): Observable<any> {
    return this.http.post(`${baseUrl}/${this.id_usuario}`, id_vacante);
  }

  unmarkFavorite(id_vacante: number): Observable<any> {
    return this.http.put(`${baseUrl}/${this.id_usuario}`, id_vacante);
  }

}
