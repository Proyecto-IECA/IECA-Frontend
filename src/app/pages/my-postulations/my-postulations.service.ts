import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class MyPostulationsService {

  constructor(private http: HttpClient) { }

  getMisPostulaciones() {
    const idUsuario = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/postulaciones/realizadas/${idUsuario}`)
  }

  cancelarPostulacion(idPostulacion) {
    return this.http.delete(`${baseUrl}/postulaciones/${idPostulacion}`);
  }
  
}
