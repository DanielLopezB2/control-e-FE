import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../../models/area.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Area[]> {
    return this.http.get<Area[]>(`${environment.APIUrlBase}/area/findAll`);
  }

  findOneAreaById(areaId: number): Observable<Area> {
    return this.http.get<Area>(`${environment.APIUrlBase}/area/${areaId}`);
  }

  createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${environment.APIUrlBase}/area`, area);
  }

  updateOneAreaById(areaId: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${environment.APIUrlBase}/area/${areaId}`, area);
  }

  deleteOneAreaById(areaId: number): Observable<any> { 
    return this.http.delete<Area>(`${environment.APIUrlBase}/area/${areaId}`);
  }

}