import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + '/vacantes'

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {
  
  constructor(private http: HttpClient) { }
  
  getListaVacantes () {
    return this.http.get(`${baseUrl}`)
  }
}
