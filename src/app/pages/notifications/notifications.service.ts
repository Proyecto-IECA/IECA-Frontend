import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getNotificaciones() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/${id}`);
  }
}
