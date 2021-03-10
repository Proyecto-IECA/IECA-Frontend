import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PeticionesService } from './peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //  ---------- VARIABLES ---------- //
  private tipo = 'empresas';

  constructor(private authService: AuthService,
              private peticion: PeticionesService) {
  }

  //  ---------- VACANTE CRUD ---------- //
  createVacante(form: any): Observable<any> {
    return this.peticion.postQuery(this.tipo, 'vacante', form);
  }

  readVacante(form: any): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

  updateVacante(form: any): Observable<any> {
    return this.peticion.putQuery(this.tipo, 'vacante', form);
  }

  deleteVacante(form: number): Observable<any> {
    return this.peticion.getQuery(this.tipo, 'vacante', form);
  }

}
