import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }
  
  private numN = new Subject<number>();
  private num = 0;
  getCantidadNotifocaciones() {
    const idUsuario = localStorage.getItem('id_usuario');
    return this.http.get(`${baseUrl}/notificaciones/sin-ver/${idUsuario}`);
  }

  setNumN(numero: number) {
    this.numN.next(numero);
    this.num = numero;
  }

  getNumN(): Observable<number> {
    return this.numN.asObservable();
  }

  getNum(): number {
    console.log(this.num);
    return this.num;
  }
}
