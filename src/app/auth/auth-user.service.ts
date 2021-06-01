import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UsuarioI } from '../models/usuario';
import { AuthResponseI } from '../models/auth-response';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl = environment.baseUrl + '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(formData: UsuarioI) {
    return this.http.post(`${baseUrl}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('id_usuario', resp.data.id_usuario);
        localStorage.setItem('tipo_usuario', resp.data.tipo_usuario);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  register(formData: UsuarioI) {
    return this.http.post(`${baseUrl}`, formData);
  }

  sendEmail(ruta, email) {
    const data = {
      email: email,
      ruta: ruta
    }
    return this.http.post(`${baseUrl}/send-email`, data);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }
}
