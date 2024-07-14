import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Asistencia } from '../../models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(`${environment.APIUrlBase}/asistencia/findAll`);
  }

  findOneAreaById(asistenciaId: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${environment.APIUrlBase}/asistencia/${asistenciaId}`);
  }

  createArea(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${environment.APIUrlBase}/asistencia`, asistencia);
  }

  updateOneAreaById(asistenciaId: number, asistencia: Asistencia): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${environment.APIUrlBase}/asistencia/${asistenciaId}`, asistencia);
  }

  deleteOneAreaById(asistenciaId: number): Observable<any> { 
    return this.http.delete<Asistencia>(`${environment.APIUrlBase}/asistencia/${asistenciaId}`);
  }

}
