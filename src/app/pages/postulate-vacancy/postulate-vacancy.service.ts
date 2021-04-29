import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostulateVacancyService {

  constructor(private http: HttpClient) { }

  getVacante(idVacante) {
    return this.http.get(`${baseUrl}/vacantes/${idVacante}`);
  }

  addPostulante(idVacante){
    const idUsuario = localStorage.getItem('id_usuario');
    const formData = {
      id_usuario_fk: idUsuario,
      id_vacante_fk: idVacante
    }
    return this.http.post(`${baseUrl}/postulaciones`, formData);
  }
}
