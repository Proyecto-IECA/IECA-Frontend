import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/usuarios/${id}`);
  }

  updateFoto(formData: any) {
    const id = localStorage.getItem('id_usuario');
    return this.http.put(`${baseUrl}/usuarios/updatefoto`, formData);
  }

  getPerfilesUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/perfiles/usuario/${id}`);
  }

  getHabilidadesUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/habilidades/${id}`);
  }

  getIdiomasUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/idiomas/${id}`);
  }

  getValoresUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/valores/${id}`);
  }

  getExpLaborales() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/experiencias-laborales/${id}`);
  }

  getExpAcademica() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/experiencias-academicas/${id}`)
  }

  getCursoCertificado() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/cursos-certificaciones/${id}`);
  }
}
