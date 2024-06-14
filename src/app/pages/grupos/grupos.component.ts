import { Component } from '@angular/core';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent {

  editarGrupoFormIsVisible = false;

  editarGrupoIsClicked() { 
    this.editarGrupoFormIsVisible = !this.editarGrupoFormIsVisible;
    if (this.editarGrupoFormIsVisible) {
      setTimeout(() => {
        const editarForm = document.getElementById('editar-form');
        if (editarForm) {
          editarForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  cancelarEditar() {
    this.editarGrupoFormIsVisible = false;
  }

  cerrarEditar() {
    this.editarGrupoFormIsVisible = false;
  }

}
