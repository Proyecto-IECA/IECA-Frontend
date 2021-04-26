import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthResponseI } from '../../models/auth-response';
import { UsuarioI } from '../../models/usuario';

const baseUrl = environment.baseUrl;
const id = localStorage.getItem('id_usuario');

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get(`${baseUrl}/usuarios/${id}`)
  }

  updateFoto(formData: any) {
    return this.http.put(`${baseUrl}/usuarios/updatefoto`, formData)
  }
  
  getPerfilesUsuario() {
    return this.http.get(`${baseUrl}/perfiles/usuario/${id}`);
  }

  getHabilidadesUsuario() {
    return this.http.get(`${baseUrl}/habilidades/${id}`);
  }

  getIdiomasUsuario() {
    return this.http.get(`${baseUrl}/idiomas/${id}`);
  }

  getValoresUsuario() {
    return this.http.get(`${baseUrl}/valores/${id}`);
  }

  getExpLaborales() {
    return this.http.get(`${baseUrl}/experiencias-laborales/${id}`);
  }

  getExpAcademica() {
    return this.http.get(`${baseUrl}/experiencias-academicas/${id}`)
  }

  getCursoCertificado() {
    return this.http.get(`${baseUrl}/cursos-certificaciones/${id}`);
  }
}
