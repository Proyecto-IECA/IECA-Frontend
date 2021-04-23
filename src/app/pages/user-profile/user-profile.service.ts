import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthResponseI } from '../../models/auth-response';
import { UsuarioI } from '../../models/usuario';

const baseUrl = environment.baseUrl + '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUsuario() {
    const id = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/${id}`)
  }

  updateFoto(formData: any) {
    return this.http.put(`${baseUrl}/updatefoto`, formData)
  }
  
}
