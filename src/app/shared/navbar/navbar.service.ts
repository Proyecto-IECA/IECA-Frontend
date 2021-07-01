import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  getCantidadNotifocaciones() {
    const idUsuario = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/notificaciones/sin-ver/${idUsuario}`);
  }
}
