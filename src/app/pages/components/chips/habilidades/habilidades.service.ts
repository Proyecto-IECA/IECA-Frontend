import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { HabilidadI } from '../../../../models/habilidad';

const baseUrl = environment.baseUrl + "/habilidades";
const id = localStorage.getItem("id_usuario");

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  constructor(private http: HttpClient) { }

  getHabilidades() {
    return this.http.get(`${baseUrl}`);
  }

  getHabilidadesUsuario() {
    return this.http.get(`${baseUrl}/${id}`);
  }

  addHabilidades(habilidades: HabilidadI[]) {
    const formData = {
      id_usuario: id,
      habilidades: habilidades
    };
    return this.http.post(`${baseUrl}`, formData);
  }
}
