import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.css'
})
export class AsistenciaComponent {

  isRegistrarAsitenciaClicked = false;

  @ViewChild('checkboxes', { read: ElementRef }) checkboxesRef!: ElementRef;

  registrarAsistenciaIsClicked() {
    this.isRegistrarAsitenciaClicked = !this.isRegistrarAsitenciaClicked;
    if (this.isRegistrarAsitenciaClicked) {
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
