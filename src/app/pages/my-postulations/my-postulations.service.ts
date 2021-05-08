import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;
const idUsuario = localStorage.getItem('id_usuario');
@Injectable({
  providedIn: 'root'
})

export class MyPostulationsService {

  constructor(private http: HttpClient) { }

  getMisPostulaciones() {
    return this.http.get(`${baseUrl}/postulaciones/realizadas/${idUsuario}`)
  }

}
