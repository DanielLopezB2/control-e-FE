import { Injectable } from '@angular/core';
import { Asignatura } from '../../models/asignatura.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${environment.APIUrlBase}/asignatura/findAll`);
  }

  findOneAsignaturaById(areaId: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${environment.APIUrlBase}/asignatura/${areaId}`);
  }

  createAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${environment.APIUrlBase}/asignatura`, asignatura);
  }

  updateOneAsignaturaById(asignaturaId: number, asignatura: Asignatura): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${environment.APIUrlBase}/asignatura/${asignaturaId}`, asignatura);
  }

  deleteOneAsignaturaById(asignaturaId: number): Observable<any> { 
    return this.http.delete<Asignatura>(`${environment.APIUrlBase}/asignatura/${asignaturaId}`);
  }
}
