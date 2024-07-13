import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HSOverlay } from 'preline';
import { Grupo } from '../../models/grupo.model';
import { GrupoService } from '../../core/services/grupo.service';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { FilterGrupoPipe } from '../../pipes/filter-grupo.pipe';
import { Estado } from '../../enums/estado.enum';
import { Horario } from '../../enums/horario.enum';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, FilterGrupoPipe, LowerCasePipe],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css'
})
export class GruposComponent implements OnInit {

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
  // -------------------------------------- ON INIT -----------------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  grupos: Grupo[] = [];
  private grupoService = inject(GrupoService);
  grupoId: number = 0;
  searchText: string = '';
  isEditingGrupo: boolean = false;

  ngOnInit(): void {
    
    this.grupoService.findAll().subscribe({
      next: res => {
        this.grupos = res;
      }
    });

  }

  // ----------------------------------------------------------------------------------------------------
  // --------------------------------------  CREAR GRUPO  -----------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  formGroupGrupo = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    horario: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required])
  });

  clickAddGrupo() { 
    this.grupoId = 0;
    this.formGroupGrupo.reset({
      estado: 'ACTIVO',
      horario: 'DIURNO'
    });
    this.isEditingGrupo = false;
  }

  clickSaveGrupo() {

    const nombre = this.formGroupGrupo.controls.nombre.value;
    let horario: Horario;
    let estado: Estado;
    const fechaCreacion = new Date();
    const fechaUltimaModificacion = new Date();

    if(this.formGroupGrupo.controls.estado.value === "ACTIVO") {
      estado = Estado.ACTIVO;
    } else {
      estado = Estado.INACTIVO;
    }

    if(this.formGroupGrupo.controls.horario.value === "DIURNO") {
      horario = Horario.DIURNO;
    }
    if(this.formGroupGrupo.controls.horario.value === "TARDE") {
      horario = Horario.TARDE;
    }
    if(this.formGroupGrupo.controls.horario.value === "NOCTURNO") {
      horario = Horario.NOCTURNO;
    }
    if(this.formGroupGrupo.controls.horario.value === "MIXTO") {
      horario = Horario.MIXTO;
    }
    if(this.formGroupGrupo.controls.horario.value === "FINES_DE_SEMANA") {
      horario = Horario.FINES_DE_SEMANA;
    }
    else {
      horario = Horario.VIRTUAL;
    }

    if (this.isEditingGrupo) { 

      const editedGrupo: Grupo = {
        nombre: nombre ?? '',
        horario: horario,
        estado: estado,
        fechaUltimaModificacion: fechaUltimaModificacion
      }

      this.grupoService.updateOneGrupoById(this.grupoId, editedGrupo).subscribe({
        next: res => {
          if (res) {
            toast.success('Grupo modificado correctamente');
          }
          this.formGroupGrupo.reset();
          this.closeOverlay("hs-overlay-grupos");
          this.grupoService.findAll().subscribe({
            next: res => {
              this.grupos = res;
            }
          });
        },
        error: error => {
          toast.error('Error al modificar grupo');
        }
  
      });

    } else {

      console.log(this.formGroupGrupo.value);

      const newGrupo: Grupo = {
        nombre: nombre ?? '',
        horario: horario,
        estado: estado,
        fechaUltimaModificacion: fechaUltimaModificacion,
        fechaCreacion: fechaCreacion
      }

      this.isEditingGrupo = false;

      this.grupoService.createGrupo(newGrupo).subscribe({
        next: res => {
          if (res) {
            toast.success('Grupo creado correctamente');
          }
          this.formGroupGrupo.reset();
          this.closeOverlay("hs-overlay-grupos");
          this.grupoService.findAll().subscribe({
            next: res => {
              this.grupos = res;
            }
          });
        },
        error: error => {
          toast.error('Error al crear grupo');
        }
      });
    }
  }

  // ----------------------------------------------------------------------------------------------------
  // --------------------------------------  EDITAR GRUPO  ----------------------------------------------
  // ----------------------------------------------------------------------------------------------------


  handleEditarGrupo(grupoId: number) {
    this.openOverlay("hs-overlay-grupos");
    this.isEditingGrupo = true;
    this.grupoId = grupoId;
    this.grupoService.findOneGrupoById(grupoId).subscribe({
      next: res => {        
        if (res) {

          let estado: string;

          if (res.estado === Estado.ACTIVO) {
            estado = "ACTIVO";
          } else {
            estado = "INACTIVO";
          }

          this.formGroupGrupo.patchValue({
            nombre: res.nombre,
            horario: res.horario.toString(),
            estado: res.estado.toString()
          });
        }
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------
  // --------------------------------------  ELIMINAR GRUPO  --------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  clickDeleteGrupo() { 

    toast('Está seguro que quiere eliminar este grupo?', {
      action: {
        label: 'Confirmar',
        onClick: () => {

          this.grupoService.deleteOneGrupoById(this.grupoId).subscribe({
            next: () => {
              toast.success('Grupo eliminado correctamente');
              this.formGroupGrupo.reset();
              this.closeOverlay("hs-overlay-grupos");
              this.grupoService.findAll().subscribe({
                next: res => {
                  this.grupos = res;
                }
              });
            },
            error: error => {
              toast.error('Error al eliminar grupo');
            }
          });

        }
      }
    });
  }

  
  // ----------------------------------------------------------------------------------------------------
  // --------------------------------------  FILTRAR GRUPO  ---------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  onSearchGrupo(textSearch: string) {
    this.searchText = textSearch;
  }


}
