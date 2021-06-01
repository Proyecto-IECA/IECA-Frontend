import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/vacantes'
const baseUrl2 = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  constructor(private http: HttpClient) {
  }

  getVacantesRecientes () {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/recientes/${id}`);
  }

  getVacantesRecomendadas () {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/recomendadas/${id}`);
  }

  getVacantes (formData) {
    const id = localStorage.getItem('id_usuario');
    return this.http.put(`${baseUrl}/generales/${id}`, formData);
  }

  getPerfilesUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl2}/perfiles/usuario/${id}`);
  }

  markFavorite(idVacante) {
    const id = localStorage.getItem('id_usuario');
    const formData = {
      id_usuario_fk: id,
      id_vacante_fk: idVacante
    }
    return this.http.post(`${baseUrl}-favoritas`, formData);
  }

  unmarkFavorite(idVacanteFav) {
    return this.http.delete(`${baseUrl}-favoritas/${idVacanteFav}`);
  }

}
