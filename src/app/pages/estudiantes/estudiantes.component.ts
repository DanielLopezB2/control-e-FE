import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

  tablaEstudianteIsVisible = false;
  editarEstudianteFormIsVisible = false;

  administrarIsClicked() {
    this.tablaEstudianteIsVisible = !this.tablaEstudianteIsVisible;
    if (this.tablaEstudianteIsVisible) {
      setTimeout(() => {
        const tablaEstudiantes = document.getElementById('tabla-estudiantes');
        if (tablaEstudiantes) {
          tablaEstudiantes.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  editarEstudianteIsClicked() { 
    this.editarEstudianteFormIsVisible = !this.editarEstudianteFormIsVisible;
    if (this.editarEstudianteFormIsVisible) {
      setTimeout(() => {
        const editarForm = document.getElementById('editar-form');
        if (editarForm) {
          editarForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  cancelarEditar() {
    this.editarEstudianteFormIsVisible = false;
  }

  cerrarEditar() {
    this.editarEstudianteFormIsVisible = false;
  }

}