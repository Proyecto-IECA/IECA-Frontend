import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { PeticionesService } from './peticiones.service';
import { Observable } from "rxjs";
import { AuthResponseI } from '../models/auth-response';
import { UsuarioI } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //  ---------- VARIABLES ---------- //
  private tipo = 'postulantes';
  

  constructor(private authService: AuthService, private peticion: PeticionesService) { }


  //  ---------- USUARIO CRUD ---------- //

  readUsuario (id: number): Observable<AuthResponseI> {
    return this.peticion.getQuery(this.tipo, 'usuario', id);
  }

  updateUsuario (form: UsuarioI): Observable<AuthResponseI> {
    return this.peticion.putQuery(this.tipo, 'usuario', form); 
  }

   //  ---------- EXPERIENCIA LABORAL CRUD ---------- //
  
   createExpLaboral (form: UsuarioI): Observable<AuthResponseI>{
     return this.peticion.postQuery(this.tipo, 'expLaboral', form);
   }

   readExpLaboral (id: number): Observable<AuthResponseI>{
     return this.peticion.getQuery(this.tipo, 'expLaboral', id);
   }

   updateExpLaboral (form: UsuarioI, id: number): Observable<AuthResponseI>{
     return this.peticion.putQuery(this.tipo, 'expLaboral', form, id);
   }

   deleteExpLaboral (id: number): Observable<AuthResponseI>{
    return this.peticion.deleteQuery(this.tipo, 'expLaboral', id);
   }
}
