import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviewsPendientes(): Observable<any> {
    const id_usuario = Number( localStorage.getItem('id_usuario') );
    return this.http.get(`${ baseUrl }/resenias/pendientes/${ id_usuario }`);
  }

  getReviews(id_empresa: number): Observable<any> {
    return this.http.get(`${ baseUrl }/resenias/${ id_empresa }`);
  }

  updateCalificar(id_receptor: number, calificacion: number, comentario: string): Observable<any> {
    const id_usuario = Number( localStorage.getItem('id_usuario') );
    const body = {
      id_emisor: id_usuario,
      id_receptor,
      calificacion,
      comentario
    }
    return this.http.post(`${ baseUrl }/resenias`, body);
  }

}
