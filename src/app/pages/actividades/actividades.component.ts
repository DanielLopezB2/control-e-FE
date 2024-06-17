import { Component } from '@angular/core';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [],
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent {


  editarFormIsVisible = false;

  handleEditar() { 
    this.editarFormIsVisible = !this.editarFormIsVisible;
    if (this.editarFormIsVisible) {
      setTimeout(() => {
        const editarForm = document.getElementById('editar-form');
        if (editarForm) {
          editarForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  cancelarEditar() {
    this.editarFormIsVisible = false;
  }

}
