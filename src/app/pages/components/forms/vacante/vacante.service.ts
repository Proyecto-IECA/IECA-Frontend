import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { VacantesI } from '../../../../models/vacantes';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class VacanteService {

  constructor(private http: HttpClient) { }

  getSucursales() {
    const id_empresa = localStorage.getItem("id_usuario");
    return this.http.get(`${baseUrl}/sucursales/${id_empresa}`);
  }

  getVacante(idVacante) {
    return this.http.get(`${baseUrl}/vacantes/vacante/${idVacante}`)
  }

  updateVacante(idVacante, formData: VacantesI) {
    return this.http.put(`${baseUrl}/vacantes/${idVacante}`, formData);
  }

  deleteVacante(idVacante) {
    return this.http.delete(`${baseUrl}/vacantes/${idVacante}`);
  }
}
