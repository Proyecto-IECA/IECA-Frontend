import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl + '/postulantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //Metodo para obtener todo el perfil del postulante
  getPostulante(id, email) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvc29yb3pjbzQ1NjVAZ21haWwuY29tIiwiaWF0IjoxNjE0OTE2MDE2LCJleHAiOjE2MTQ5NTkyMTYsImp0aSI6IjY4NWJmMjkyLWYyODEtNGM3OS04M2Q0LTc5N2U3ZmJlOGMyOCJ9.oQ0LrkCl_4lFyZwhck9unGBhP_ryU9jC_1SwGViTQpI';
    const url = baseUrl + '/' + id;
    return this.http.get(url, {
      headers: {
        'x-token': token,
        'email': email
      }
    });
  }
   
}
