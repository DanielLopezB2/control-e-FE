import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from '../models/estudiante.model';

@Pipe({
  name: 'filterEstudiante',
  standalone: true
})
export class FilterEstudiantePipe implements PipeTransform {

  transform(estudiantes: Estudiante[], search: string = ''): Estudiante[] {

    if (search.length === 0) {
      return estudiantes;
    }

    const filteredEstudiantes = estudiantes.filter(estudiante => 
      estudiante.nombres.toLowerCase().includes(search.toLowerCase()) ||
      estudiante.apellidos.toLowerCase().includes(search.toLowerCase())
    );

    return filteredEstudiantes;
    
  }

}
