import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ValorI } from '../../../../models/valor';

const baseUrl = environment.baseUrl + "/valores";

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor(private http: HttpClient) { }

  getValores() {
    return this.http.get(`${baseUrl}`);
  }

  getValoresUsuario() {
    const id = localStorage.getItem("id_usuario");
    return this.http.get(`${baseUrl}/${id}`);
  }

  addValores(valores: ValorI[]) {
    const id = localStorage.getItem("id_usuario");
    const formData = {
      id_usuario: id,
      valores: valores
    };
    return this.http.post(`${baseUrl}`, formData);
  }
}
