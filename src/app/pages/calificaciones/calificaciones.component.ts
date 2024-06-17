import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [],
  templateUrl: './calificaciones.component.html',
  styleUrl: './calificaciones.component.css'
})
export class CalificacionesComponent {

  isRegistrarCalificacionesClicked = false;

  @ViewChild('checkboxes', { read: ElementRef }) checkboxesRef!: ElementRef;

  registrarCalificacionesIsClicked() {
    this.isRegistrarCalificacionesClicked = !this.isRegistrarCalificacionesClicked;
    if (this.isRegistrarCalificacionesClicked) {
      setTimeout(() => {
        const tablaGrupos = document.getElementById('tabla-grupos');
        if (tablaGrupos) {
          tablaGrupos.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  checkAll(event: Event) {
    const checkboxes = this.checkboxesRef.nativeElement.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: HTMLInputElement) => checkbox.checked = (event.target as HTMLInputElement).checked);
  }  

}
