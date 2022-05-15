import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UsuarioI } from 'app/models/usuario';

const baseUrl = environment.baseUrl +'/usuarios';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  updateUsuario(formData: UsuarioI) {
    const id = localStorage.getItem('id_usuario');
    return this.http.put(`${baseUrl}/update/${id}`, formData);
  }
}
