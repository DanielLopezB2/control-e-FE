import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../../models/grupo.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${environment.APIUrlBase}/grupo/findAll`);
  }

  findOneGrupoById(grupoId: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${environment.APIUrlBase}/grupo/${grupoId}`);
  }

  createGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(`${environment.APIUrlBase}/grupo`, grupo);
  }

  updateOneGrupoById(grupoId: number, grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${environment.APIUrlBase}/grupo/${grupoId}`, grupo);
  }

  deleteOneGrupoById(grupoId: number): Observable<any> { 
    return this.http.delete<Grupo>(`${environment.APIUrlBase}/grupo/${grupoId}`);
  }
}
