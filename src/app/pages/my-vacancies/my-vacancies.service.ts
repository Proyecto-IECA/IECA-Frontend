import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + "/vacantes";
const id = localStorage.getItem("id_usuario");

@Injectable({
  providedIn: 'root'
})
export class MyVacanciesService {

  constructor(private http: HttpClient) { }

  getVacantes() {
    return this.http.get(`${baseUrl}/empresa/${id}`);
  }

  publicarVacante(id_vacante) {
    return this.http.get(`${baseUrl}/publicar/${id_vacante}`);
  }

  noPublicarVacante(id_vacante) {
    return this.http.get(`${baseUrl}/no-publicar/${id_vacante}`);
  }

  abrirVacante(id_vacante) {
    return this.http.get(`${baseUrl}/abrir/${id_vacante}`);
  }

  cerrarVacante(id_vacante) {
    return this.http.get(`${baseUrl}/cerrar/${id_vacante}`);
  }
}
