import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MatPaginator } from '@angular/material/paginator';

const baseUrl = environment.baseUrl + '/vacantes'
const baseUrl2 = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  private id_usuario = localStorage.getItem('id_usuario');

  constructor(private http: HttpClient) {
  }

  getVacantesRecientes () {
    return this.http.get(`${baseUrl}/recientes/${this.id_usuario}`);
  }

  getVacantesRecomendadas () {
    return this.http.get(`${baseUrl}/recomendadas/${this.id_usuario}`);
  }

  getVacantes (formData) {
    return this.http.put(`${baseUrl}/generales/${this.id_usuario}`, formData);
  }

  getPerfilesUsuario() {
    return this.http.get(`${baseUrl2}/perfiles/usuario/${this.id_usuario}`);
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
