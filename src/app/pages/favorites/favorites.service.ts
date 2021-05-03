import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/vacantes-favoritas'


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private id_usuario = localStorage.getItem('id_usuario');

  constructor(private http: HttpClient) { }

  getVacantesFav () {
    return this.http.get(`${baseUrl}/${this.id_usuario}`);
  }
}
