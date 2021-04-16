import { Injectable } from '@angular/core';
import { PeticionesService } from './peticiones.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponseI } from '../models/auth-response';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { UsuarioI } from '../models/usuario';
import { EmpresaI } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //  ---------- VARIABLES ---------- //
  private baseUrl: string = environment.baseUrl;
  email: string;


  constructor(private http: HttpClient,
              private authService: AuthService,
              private peticion: PeticionesService) {
    this.email = this.authService.usuario.email;
  }

  async actualizarFoto(archivo: File) /*: Promise<Observable<AuthResponseI>>*/ {
    console.log(archivo);
    const body = {
        foto_empresa: archivo.name
    };

    // Obtenemos el tipo
    const tipo = localStorage.getItem('tipo');
    switch (tipo) {
      case '1':
          this.peticion.putQuery('usuarios', 'update-foto', body)
              .subscribe(
              (resp: AuthResponseI) => {
                console.log(resp);
              });
          break;

      case '2':
          this.peticion.putQuery('empresas', 'update-foto', body)
              .subscribe(
                  (resp: AuthResponseI) => {
                    console.log(resp);
                  });
          break;

      default:
        console.log('Error al encontrar un tipo');
        this.authService.validarToken();
    }

/*
    try {

      // Creación y asignación de valores de los headers
      const headers = {
        'x-token': localStorage.getItem('token'),
        'email': this.email
      };

      // Variable para la assignation de la URL completo
      const url = `${this.baseUrl}/empresas/update-foto`;

      // La imagen se carga como formData
      const formData = new FormData();
      formData.append('foto_empresa', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers,
        body: formData
      });
      console.log(resp);

      const data = await resp.json();
      console.log(data);

      // return this.peticion.putQuery('empresas', 'update-foto', archivo, id);
    } catch (error) {
      console.log(error);
      return null;
    }
*/

  }

  /*actualizarFoto(archivo: File): Observable<AuthResponseI> {
    const tipo = localStorage.getItem('tipo');
    if (tipo === '1') {
      return this.peticion.putQuery('postulantes', 'update-foto', archivo);
    }
    if (tipo === '2') {
      return this.peticion.putQuery('empresas', 'update-foto', archivo);
    }
  }

  extraerBase64 = async($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (error) {
      return null;
    }
  });*/

}
