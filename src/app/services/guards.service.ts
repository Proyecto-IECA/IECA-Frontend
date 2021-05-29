import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const baseUrl = environment.baseUrl + "/validar";
const id = localStorage.getItem('id_usuario');
const token = localStorage.getItem('token') || '';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private http: HttpClient) { }

  validarToken() {
    return this.http.get(`${baseUrl}/token/${id}`, {
      headers: {
        'x-token': token
      }
    }).pipe(map((resp: any) => {
      console.log(resp);
      if (resp.status) return true;
      return false;
    }));
  }
}
