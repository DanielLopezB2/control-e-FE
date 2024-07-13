import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiante } from '../../models/estudiante.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${environment.APIUrlBase}/estudiante/findAll`);
  }

  findOneEstudianteById(estudianteId: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${environment.APIUrlBase}/estudiante/${estudianteId}`);
  }

  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${environment.APIUrlBase}/estudiante`, estudiante);
  }

  updateOneEstudianteById(estudianteId: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${environment.APIUrlBase}/estudiante/${estudianteId}`, estudiante);
  }

  deleteOneEstudianteById(estudianteId: number): Observable<any> { 
    return this.http.delete<Estudiante>(`${environment.APIUrlBase}/estudiante/${estudianteId}`);
  }
}
