import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ValorI } from '../../../../models/valor';

const baseUrl = environment.baseUrl + "/valores";
const id = localStorage.getItem("id_usuario");

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor(private http: HttpClient) { }

  getValores() {
    return this.http.get(`${baseUrl}`);
  }

  getValoresUsuario() {
    return this.http.get(`${baseUrl}/${id}`);
  }

  addValores(valores: ValorI[]) {
    const formData = {
      id_usuario: id,
      valores: valores
    };
    return this.http.post(`${baseUrl}`, formData);
  }
}
