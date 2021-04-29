import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PostulateVacancyService {

  constructor(private http: HttpClient) { }

  getVacante(idVacante) {
    return this.http.get(`${baseUrl}/vacantes/${idVacante}`);
  }
}
