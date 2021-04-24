import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExperienciaLaboralI } from '../../../../models/experiencia_laboral';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  constructor(private http: HttpClient) { }

  addExpLaboral (formData: ExperienciaLaboralI) {
    return this.http.post(`${baseUrl}/experiencias-laborales`, formData);
  }
}
