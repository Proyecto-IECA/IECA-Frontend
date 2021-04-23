import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + "/perfiles";


@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private http: HttpClient) { }

  getPerfilesVacantes(id_vacante) {
    return this.http.get(`${baseUrl}/vacante/${id_vacante}`);
  }

  getPerfiles() {
    return this.http.get(`${baseUrl}`);
  }
}
