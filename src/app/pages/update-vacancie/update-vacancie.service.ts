import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UpdateVacancieService {

  constructor(private http: HttpClient) { }

  getPerfilesVacante(id_vacante) {
    return this.http.get(`${baseUrl}/perfiles/vacante/${id_vacante}`);
  }
}
