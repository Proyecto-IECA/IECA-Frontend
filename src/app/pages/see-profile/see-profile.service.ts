import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SeeProfileService {

  constructor(private http: HttpClient) { }

  getUsuario(id) {
    return this.http.get(`${baseUrl}/usuarios/${id}`)
  }

  getExpLaboral(id) {
    return this.http.get(`${baseUrl}/experiencias-laborales/${id}`);
  }

  getExpAcademica(id) {
    return this.http.get(`${baseUrl}/experiencias-academicas/${id}`);
  }

  getHabilidad(id){
    return this.http.get(`${baseUrl}/habilidades/${id}`);
  }

  getValor(id) {
    return this.http.get(`${baseUrl}/valores/${id}`);
  }

  getIdioma(id) {
    return this.http.get(`${baseUrl}/idiomas/${id}`);
  }

  getPerfil(id) {
    return this.http.get(`${baseUrl}/perfiles/usuario/${id}`);
  }

  getCursoCertificado(id) {
    return this.http.get(`${baseUrl}/cursos-certificaciones/${id}`);
  }
}
