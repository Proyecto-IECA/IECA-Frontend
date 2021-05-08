import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl + '/comentarios';

@Injectable({
  providedIn: 'root'
})
export class SeeCompanyService {

  constructor(private http: HttpClient) { }


  getCompany(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/empresa/${id}`)
  }

}
