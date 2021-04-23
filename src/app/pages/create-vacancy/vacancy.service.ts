import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { VacantesI } from '../../models/vacantes';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private http: HttpClient) { }

  getSucursales() {
    const id_empresa = localStorage.getItem("id_usuario");
    return this.http.get(`${baseUrl}/sucursales/${id_empresa}`);
  }

  addVacante(formData: VacantesI) {
    formData.id_usuario_fk = parseInt(localStorage.getItem("id_usuario"));
    return this.http.post(`${baseUrl}/vacantes`, formData);
  }

  getPerfilesVacantes(id_vacante) {
    return this.http.get(`${baseUrl}/perfiles/vacante/${id_vacante}`);
  }


}
