import { Component } from '@angular/core';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent {

  tablaEstudiantesVisible = false;
  editarFormVisible = false;

  tablaEstudiantesIsVisible() {
    this.tablaEstudiantesVisible = !this.tablaEstudiantesVisible;
    this.editarFormVisible = false;
    if (this.tablaEstudiantesVisible) {
      setTimeout(() => {
        const tablaEstudiantes = document.getElementById('tabla-estudiantes');
        if (tablaEstudiantes) {
          tablaEstudiantes.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
    
  }

  editarFormIsVisible() {
    this.editarFormVisible = !this.editarFormVisible;
    this.tablaEstudiantesVisible = false;
    if (this.editarFormVisible) {
      setTimeout(() => {
        const editarForm = document.getElementById('editar-form');
        if (editarForm) {
          editarForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
    
  }

  cerrarEditar() { 
    this.editarFormVisible = false;
  }

}
