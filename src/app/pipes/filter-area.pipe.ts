import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../models/area.model';

@Pipe({
  name: 'filterArea',
  standalone: true
})
export class FilterAreaPipe implements PipeTransform {

  transform(areas: Area[], search: string = ''): Area[] {

    if (search.length === 0) {
      return areas;
    }

    const filteredAreas = areas.filter(area => area.nombre.toLowerCase().includes(search.toLowerCase()));

    return filteredAreas;
    
  }

}
