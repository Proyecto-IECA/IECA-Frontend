import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { VacantesI } from '../../models/vacantes';
import { PerfilI } from 'app/models/perfil';

const baseUrl = environment.baseUrl;
const id_empresa = parseInt(localStorage.getItem("id_usuario"));

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private http: HttpClient) { }

  getSucursales() {
    return this.http.get(`${baseUrl}/sucursales/${id_empresa}`);
  }

  addVacante(formData: VacantesI) {
    formData.id_usuario_fk = id_empresa;
    return this.http.post(`${baseUrl}/vacantes`, formData);
  }

  getPerfiles() {
    return this.http.get(`${baseUrl}/perfiles`);
  }

  addPerfilesVacante(id_vacante, perfiles: PerfilI[]) {
    const formData = {
      id_vacante: id_vacante,
      perfiles: perfiles
    };
    return this.http.post(`${baseUrl}/perfiles/vacante`, formData);
  }
}
