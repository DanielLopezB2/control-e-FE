import { Component } from '@angular/core';

@Component({
  selector: 'app-areas-asignaturas',
  standalone: true,
  imports: [],
  templateUrl: './areas-asignaturas.component.html',
  styleUrl: './areas-asignaturas.component.css'
})
export class AreasAsignaturasComponent {

  editarAreaFormIsVisible = false;
  editarAsignaturaFormIsVisible = false;

  handleEditarArea() {
    this.editarAreaFormIsVisible = !this.editarAreaFormIsVisible;
    this.editarAsignaturaFormIsVisible = false;
    if (this.editarAreaFormIsVisible) {
      setTimeout(() => {
        const tablaGrupos = document.getElementById('editar-area-form');
        if (tablaGrupos) {
          tablaGrupos.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  handleEditarAsignatura() {
    this.editarAsignaturaFormIsVisible = !this.editarAsignaturaFormIsVisible;
    this.editarAreaFormIsVisible = false;
    if (this.editarAsignaturaFormIsVisible) {
      setTimeout(() => {
        const tablaGrupos = document.getElementById('editar-asignatura-form');
        if (tablaGrupos) {
          tablaGrupos.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  handleCloseEditarArea() {
    this.editarAreaFormIsVisible = false;
  }

  handleCloseEditarAsignatura() {
    this.editarAsignaturaFormIsVisible = false;
  }

}
