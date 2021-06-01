import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/vacantes-favoritas'


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  getVacantesFav () {
    const id_usuario = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/${id_usuario}`);
  }
}
