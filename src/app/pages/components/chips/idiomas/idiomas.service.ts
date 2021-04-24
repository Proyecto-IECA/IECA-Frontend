import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IdiomaI } from '../../../../models/idioma';

const baseUrl = environment.baseUrl + "/idiomas";
const id = localStorage.getItem("id_usuario");

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  constructor(private http: HttpClient) { }

  getIdiomas() {
    return this.http.get(`${baseUrl}`);
  }

  getIdiomasUsuario() {
    return this.http.get(`${baseUrl}/${id}`);
  }

  addIdiomas(idiomas: IdiomaI[]) {
    const formData = {
      id_usuario: id,
      idiomas: idiomas
    };
    return this.http.post(`${baseUrl}`, formData);
  }
}
