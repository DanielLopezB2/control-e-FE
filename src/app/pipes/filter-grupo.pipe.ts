import { Pipe, PipeTransform } from '@angular/core';
import { Grupo } from '../models/grupo.model';

@Pipe({
  name: 'filterGrupo',
  standalone: true
})
export class FilterGrupoPipe implements PipeTransform {

  transform(grupos: Grupo[], search: string = ''): Grupo[] {

    if (search.length === 0) {
      return grupos;
    }

    const filteredGrupos = grupos.filter(grupo => 
      grupo.nombre.toLowerCase().includes(search.toLowerCase()));

    return filteredGrupos;
    
  }

}
