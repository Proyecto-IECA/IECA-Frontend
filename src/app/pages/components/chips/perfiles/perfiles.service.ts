import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { PerfilI } from '../../../../models/perfil';

const baseUrl = environment.baseUrl + "/perfiles";


@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }

  getPerfilesVacantes(id_vacante) {
    return this.http.get(`${baseUrl}/vacante/${id_vacante}`);
  }

  getPerfilesUsuario(id_usuario) {
    return this.http.get(`${baseUrl}/usuario/${id_usuario}`);
  }

  getPerfiles() {
    return this.http.get(`${baseUrl}`);
  }

  addPerfilesVacante(id_vacante, perfiles: PerfilI[]) {
    const formData = {
      id_vacante: id_vacante,
      perfiles: perfiles
    };
    return this.http.post(`${baseUrl}/vacante`, formData);
  }
  addPerfilesUsuario(id_usuario, perfiles: PerfilI[]) {
    const formData = {
      id_usuario: id_usuario,
      perfiles: perfiles
    };
    return this.http.post(`${baseUrl}/usuario`, formData);
  }
}
