import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioI } from '../models/usuario';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private http: HttpClient) { }

  forgotPass(formData: UsuarioI) {
    return this.http.post(`${baseUrl}/renewpass/`, formData);
  }
  
}

