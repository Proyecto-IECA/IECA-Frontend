import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const baseUrl = environment.baseUrl + '/validar';

@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private http: HttpClient) { }

  validarToken() {
    const id = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/token/${id}`, {
      headers: {
        'x-token': token
      }
    }).pipe(map((resp: any) => {
      console.log(resp);
      return resp.status;
    }));
  }
}
