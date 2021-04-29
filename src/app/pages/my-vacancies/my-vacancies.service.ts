import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl + "/vacantes";
const id = localStorage.getItem("id_usuario");

@Injectable({
  providedIn: 'root'
})
export class MyVacanciesService {

  constructor(private http: HttpClient) { }

  getVacantes() {
    return this.http.get(`${baseUrl}/empresa/${id}`);
  }
}
