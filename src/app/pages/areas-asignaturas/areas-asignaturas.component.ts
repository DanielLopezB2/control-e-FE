import { Component, inject, OnInit } from '@angular/core';
import { Area } from '../../models/area.model';
import { AreaService } from '../../core/services/area.service';
import { Estado } from '../../enums/estado.enum';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { HSOverlay } from 'preline';
import { LowerCasePipe, NgFor, TitleCasePipe } from '@angular/common';
import { FilterAreaPipe } from '../../pipes/filter-area.pipe';
import { AsignaturaService } from '../../core/services/asignatura.service';
import { Asignatura } from '../../models/asignatura.model';

@Component({
  selector: 'app-areas-asignaturas',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, FormsModule, FilterAreaPipe, NgFor, LowerCasePipe],
  templateUrl: './areas-asignaturas.component.html',
  styleUrl: './areas-asignaturas.component.css'
})
export class AreasAsignaturasComponent implements OnInit {

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- CERRAR OVERLAY ------------------------------------------------
  // ----------------------------------------------------------------------------------------------------
  closeOverlay(id: string) {
    const element = document.getElementById(id);
    if (element !== null) {
      HSOverlay.close(element);
    } else {
      console.error('Elemento no encontrado');
    }
  }

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- ABRIR OVERLAY ------------------------------------------------
  // ----------------------------------------------------------------------------------------------------
  openOverlay(id: string) {
    const element = document.getElementById(id);
    if (element !== null) {
      HSOverlay.open(element);
    } else {
      console.error('Elemento no encontrado');
    }
  }
  

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- CARGAR AREAS ------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  areas: Area[] = [];
  private areaService = inject(AreaService);

  ngOnInit(): void {

    this.areaService.findAll().subscribe({
      next: res => {
        this.areas = res;
      }
    });

    this.asignaturaService.findAll().subscribe({
      next: res => {
        this.asignaturas = res;
      }
    });
    
  }

  // ----------------------------------------------------------------------------------------------------
  // -----------------------------------------   CREAR AREA  --------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required])
  });

  clickAddArea() { 
    this.areaId = 0;
    this.formGroup.reset();
    this.isEditing = false;
  }

  clickSave() {

    const nombre = this.formGroup.controls.nombre.value;
    const descripcion = this.formGroup.controls.descripcion.value;
    const fechaCreacion = new Date();
    const fechaUltimaModificacion = new Date();
    let estado: Estado;

    if(this.formGroup.controls.estado.value === "ACTIVO") {
      estado = Estado.ACTIVO;
    } else {
      estado = Estado.INACTIVO;
    }

    if (this.isEditing) { 

      const editedArea: Area = {
        nombre: nombre ?? '',
        descripcion: descripcion ?? '',
        estado: estado,
        fechaUltimaModificacion: fechaUltimaModificacion
      }

      this.areaService.updateOneAreaById(this.areaId, editedArea).subscribe({
        next: res => {
          if (res) {
            toast.success('Área modificada correctamente');
          }
          this.formGroup.reset();
          this.closeOverlay("hs-overlay-right");
          this.areaService.findAll().subscribe({
            next: res => {
              this.areas = res;
            }
          });
        },
        error: error => {
          toast.error('Error al modificar área');
        }
  
      });

    } else {

      const newArea: Area = {
        nombre: nombre ?? '',
        descripcion: descripcion ?? '',
        estado: estado,
        fechaCreacion: fechaCreacion,
        fechaUltimaModificacion: fechaUltimaModificacion
      }

      this.areaService.createArea(newArea).subscribe({
        next: res => {
          if (res) {
            toast.success('Área creada correctamente');
          }
          this.formGroup.reset();
          this.closeOverlay("hs-overlay-right");
          this.areaService.findAll().subscribe({
            next: res => {
              this.areas = res;
            }
          });
        },
        error: error => {
          toast.error('Error al crear área');
        }
      });
    }
  }


  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------------  EDITAR AREA  ---------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  areaId!: number;
  isEditing: boolean = false;

  handleEditarArea(areaId: number) {
    this.openOverlay("hs-overlay-right");
    this.isEditing = true;
    this.areaId = areaId;
    this.areaService.findOneAreaById(areaId).subscribe({
      next: res => {        
        if (res) {

          let estado: string;

          if (res.estado === Estado.ACTIVO) {
            estado = "ACTIVO";
          } else {
            estado = "INACTIVO";
          }

          this.formGroup.patchValue({
            nombre: res.nombre,
            descripcion: res.descripcion,
            estado: res.estado.toString()
          });
        }
      }
    });
  }

  //----------------------------------------------------------------------------------------------------
  //-----------------------------------------ELIMINAR AREA----------------------------------------------
  //----------------------------------------------------------------------------------------------------

  clickDeleteArea() { 

    toast('Está seguro que quiere eliminar esta área?', {
      action: {
        label: 'Confirmar',
        onClick: () => {

          this.areaService.deleteOneAreaById(this.areaId).subscribe({
            next: () => {
              toast.success('Área eliminada correctamente');
              this.formGroup.reset();
              this.closeOverlay("hs-overlay-right");
              this.areaService.findAll().subscribe({
                next: res => {
                  this.areas = res;
                }
              });
            },
            error: error => {
              toast.error('Error al eliminar área');
            }
          });

        }
      }
    });

  }

  //----------------------------------------------------------------------------------------------------
  //-------------------------------------- FILTRAR AREA-------------------------------------------------
  //----------------------------------------------------------------------------------------------------

  searchText: string = '';

  onSearchArea(text: string) {
    this.searchText = text;
  }

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- CARGAR ASIGNATURAS ------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  asignaturas: Asignatura[] = [];
  asignaturaService = inject(AsignaturaService);

  // ----------------------------------------------------------------------------------------------------
  // -----------------------------------   CREAR ASIGNATURA  --------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  formGroupAsignatura = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    area: new FormControl('')
  });

  clickAddAsignatura() { 
    this.asignaturaId = 0;
    this.formGroupAsignatura.reset();
    this.isEditingAsignatura = false;
  }

  clickSaveAsignatura() {

    const nombre = this.formGroupAsignatura.controls.nombre.value;
    const descripcion = this.formGroupAsignatura.controls.descripcion.value;
    const fechaCreacion = new Date();
    const fechaUltimaModificacion = new Date();
    const areaId = this.formGroupAsignatura.controls.area.value;
    let estado: Estado;

    if(this.formGroupAsignatura.controls.estado.value === "ACTIVO") {
      estado = Estado.ACTIVO;
    } else {
      estado = Estado.INACTIVO;
    }

    if (this.isEditingAsignatura) { 

      const editedAsignatura: Asignatura = {
        nombre: nombre ?? '',
        descripcion: descripcion ?? '',
        estado: estado,
        fechaUltimaModificacion: fechaUltimaModificacion,
        areaId: parseInt(areaId ?? '0')
      }

      this.asignaturaService.updateOneAsignaturaById(this.asignaturaId, editedAsignatura).subscribe({
        next: res => {
          if (res) {
            toast.success('Asignatura modificada correctamente');
          }
          this.formGroupAsignatura.reset();
          this.closeOverlay("hs-overlay-right-asignaturas");
          this.areaService.findAll().subscribe({
            next: res => {
              this.areas = res;
            }
          });
        },
        error: error => {
          toast.error('Error al modificar asignatura');
        }
  
      });

    } else {

      const newAsignatura: Asignatura = {
        nombre: nombre ?? '',
        descripcion: descripcion ?? '',
        estado: estado,
        fechaCreacion: fechaCreacion,
        fechaUltimaModificacion: fechaUltimaModificacion,
        areaId: parseInt(areaId ?? '0')
      }

      this.isEditingAsignatura = false;

      this.asignaturaService.createAsignatura(newAsignatura).subscribe({
        next: res => {
          if (res) {
            toast.success('Asignatura creada correctamente');
          }
          this.formGroupAsignatura.reset();
          this.closeOverlay("hs-overlay-right-asignaturas");
          this.areaService.findAll().subscribe({
            next: res => {
              this.areas = res;
            }
          });
        },
        error: error => {
          toast.error('Error al crear asignatura');
        }
      });
    }
  }


  // ----------------------------------------------------------------------------------------------------
  // ----------------------------------  EDITAR ASIGNATURA  ---------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  asignaturaId!: number;
  isEditingAsignatura: boolean = false;

  handleEditarAsignatura(asignaturaId: number) {
    this.openOverlay("hs-overlay-right-asignaturas");
    this.isEditingAsignatura = true;
    this.asignaturaId = asignaturaId;
    this.asignaturaService.findOneAsignaturaById(asignaturaId).subscribe({
      next: res => {        
        if (res) {

          let estado: string;

          if (res.estado === Estado.ACTIVO) {
            estado = "ACTIVO";
          } else {
            estado = "INACTIVO";
          }

          this.formGroupAsignatura.patchValue({
            nombre: res.nombre,
            descripcion: res.descripcion,
            estado: res.estado.toString(),
            area: res.areaId?.toString()
          });
        }
      }
    });
  }

  //----------------------------------------------------------------------------------------------------
  //-----------------------------------------ELIMINAR ASIGNATURA----------------------------------------
  //----------------------------------------------------------------------------------------------------

  clickDeleteAsignatura() { 

    toast('Está seguro que quiere eliminar esta asignatura?', {
      action: {
        label: 'Confirmar',
        onClick: () => {

          this.asignaturaService.deleteOneAsignaturaById(this.asignaturaId).subscribe({
            next: () => {
              toast.success('Asignatura eliminada correctamente');
              this.formGroupAsignatura.reset();
              this.closeOverlay("hs-overlay-right-asignaturas");
              this.areaService.findAll().subscribe({
                next: res => {
                  this.areas = res;
                }
              });
            },
            error: error => {
              toast.error('Error al eliminar asignatura');
            }
          });

        }
      }
    });
  }
}
