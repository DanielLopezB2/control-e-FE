import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  isEditarFormClicked = false;

  editarFormClicked() {
    this.isEditarFormClicked = !this.isEditarFormClicked;
    if (this.isEditarFormClicked) {
      setTimeout(() => {
        const editarForm = document.getElementById('editar-form');
        if (editarForm) {
          editarForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  cerrarEditar() { 
    this.isEditarFormClicked = false;
  }

}
