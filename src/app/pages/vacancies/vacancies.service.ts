import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/vacantes'

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  private id_usuario = localStorage.getItem('id_usuario');

  constructor(private http: HttpClient) {
  }

  getListaVacantes () {
    return this.http.get(`${baseUrl}/${this.id_usuario}`);
  }

  markFavorite(idVacante) {
    const formData = {
      id_usuario_fk: this.id_usuario,
      id_vacante_fk: idVacante
    }
    return this.http.post(`${baseUrl}-favoritas`, formData);
  }

  unmarkFavorite(idVacanteFav) {
    return this.http.delete(`${baseUrl}-favoritas/${idVacanteFav}`);
  }

}
