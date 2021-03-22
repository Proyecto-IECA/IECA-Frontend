import { Injectable } from '@angular/core';
import { PeticionesService } from './peticiones.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponseI } from '../models/auth-response';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  email: string;


  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.email = this.authService.usuario.email;
  }


  async actualizarFoto(archivo: File, id: number) {

    try {

      // Creación y asignación de valores de los headers
      const headers = {
        'x-token': localStorage.getItem('token'),
        'email': this.email
      };

      // Variable para la assignation de la URL completo
      const url = `${this.baseUrl}/empresas/update-foto`;

      const formData = new FormData();
      formData.append('foto_empresa', archivo);

      const resp = await fetch(url, { method: 'PUT',  headers , body: formData});
      console.log(resp);

      // return this.peticion.putQuery('empresas', 'update-foto', archivo, id);
    } catch (error) {
      console.log(error);
      return null;
    }

  }

}
