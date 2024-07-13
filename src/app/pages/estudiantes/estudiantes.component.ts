import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HSOverlay } from 'preline';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../core/services/estudiante.service';
import { FilterEstudiantePipe } from '../../pipes/filter-estudiante.pipe';
import { TipoDocumentoIdentidad } from '../../enums/tipoDocumentoIdentidad.enum';
import { Estado } from '../../enums/estado.enum';
import { Genero } from '../../enums/genero.enum';
import { toast } from 'ngx-sonner';
import HSTooltip from '@preline/tooltip';
import { Grupo } from '../../models/grupo.model';
import { GrupoService } from '../../core/services/grupo.service';
import { FilterGrupoPipe } from '../../pipes/filter-grupo.pipe';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe, FormsModule, LowerCasePipe, FilterEstudiantePipe, FilterGrupoPipe],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
  estudianteId: number = 0;
  isEditingEstudiante: boolean = false;

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
  // -------------------------------------- SHOW TOOLTIP ------------------------------------------------
  // ----------------------------------------------------------------------------------------------------
  showTooltip() {
    const element = document.getElementById("hs-tooltip");
    if (element !== null) {
      HSTooltip.show(element);
    } else {
      console.error('Elemento no encontrado');
    }
  }

  // ----------------------------------------------------------------------------------------------------
  // --------------------------------- CARGAR ESTUDIANTES Y GRUPOS --------------------------------------
  // ----------------------------------------------------------------------------------------------------

  estudiantes: Estudiante[] = [];
  private estudianteService = inject(EstudianteService);

  grupos: Grupo[] = [];
  private grupoService = inject(GrupoService);

  grupoId: number = 0;

  ngOnInit(): void {

    this.grupoService.findAll().subscribe({
      next: res => {
        this.grupos = res;
      }
    });

    this.estudiantes = [];
    
  }

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- FILTRAR ESTUDIANTE ------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  searchText: string = '';

  onSearchEstudiante(text: string) {
    this.searchText = text;
  }

  // ----------------------------------------------------------------------------------------------------
  // -----------------------------------------   CREAR ESTUDIANTE  --------------------------------------
  // ----------------------------------------------------------------------------------------------------

  formGroupEstudiante = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    tipoDocumentoIdentidad: new FormControl('CEDULA', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
    genero: new FormControl('MASCULINO', [Validators.required]),
    estado: new FormControl('ACTIVO', [Validators.required]),
    grupoId: new FormControl(1, [Validators.required]),
    fechaCreacion: new FormControl(''),
    fechaUltimaModificacion: new FormControl('')
  });

  clickAddEstudiante() { 
    this.estudianteId = 0;
    this.formGroupEstudiante.reset({
      nombres: '',
      apellidos: '',
      tipoDocumentoIdentidad: 'CEDULA',
      numeroDocumento: '',
      email: '',
      telefono: '',
      genero: 'MASCULINO',
      estado: 'ACTIVO',
      grupoId: 1,
      fechaCreacion: '',
      fechaUltimaModificacion: ''
    });
    this.isEditingEstudiante = false;
  }

  clickSave() {
    const nombres = this.formGroupEstudiante.controls.nombres.value;
    const apellidos = this.formGroupEstudiante.controls.apellidos.value;
    let tipoDocumentoIdentidad = TipoDocumentoIdentidad.CEDULA;
    const numeroDocumento = this.formGroupEstudiante.controls.numeroDocumento.value;
    const email = this.formGroupEstudiante.controls.email.value;
    const telefono = this.formGroupEstudiante.controls.telefono.value;
    let genero = Genero.MASCULINO;
    let estado: Estado;
    const grupoId = this.formGroupEstudiante.controls.grupoId.value;
    const fechaCreacion = new Date();
    const fechaUltimaModificacion = new Date();

    if(this.formGroupEstudiante.controls.estado.value === "ACTIVO") {
      estado = Estado.ACTIVO;
    } else {
      estado = Estado.INACTIVO;
    }

    if(this.formGroupEstudiante.controls.tipoDocumentoIdentidad.value === "CEDULA") {
      tipoDocumentoIdentidad = TipoDocumentoIdentidad.CEDULA;
    }
    if(this.formGroupEstudiante.controls.tipoDocumentoIdentidad.value === "PASAPORTE") {
      tipoDocumentoIdentidad = TipoDocumentoIdentidad.PASAPORTE;
    }
    if(this.formGroupEstudiante.controls.tipoDocumentoIdentidad.value === "TARJETA_IDENTIDAD") {
      tipoDocumentoIdentidad = TipoDocumentoIdentidad.TARJETA_IDENTIDAD;
    }

    if(this.formGroupEstudiante.controls.genero.value === "MASCULINO") {
      genero = Genero.MASCULINO;
    }

    if(this.formGroupEstudiante.controls.genero.value === "FEMENINO") {
      genero = Genero.FEMENINO;
    }

    if (this.isEditingEstudiante) { 

      const editedEstudiante: Estudiante = {
        nombres: nombres ?? '',
        apellidos: apellidos ?? '',
        tipoDocumentoIdentidad: tipoDocumentoIdentidad,
        numeroDocumento: parseInt(numeroDocumento ?? '0'),
        email: email ?? '',
        telefono: parseInt(telefono ?? '0'),
        genero: genero,
        estado: estado,
        grupoId: grupoId ?? 0,
        fechaUltimaModificacion: fechaUltimaModificacion

      }

      this.estudianteService.updateOneEstudianteById(this.estudianteId, editedEstudiante).subscribe({
        next: res => {
          if (res) {
            toast.success('Estudiante modificado correctamente');
          }
          this.formGroupEstudiante.reset();
          this.closeOverlay("hs-overlay-estudiantes");
          this.grupoService.findAll().subscribe({
            next: res => {
              this.grupos = res;
            }
          });
          this.estudianteService.findAllByGrupoId(this.grupoId).subscribe({
            next: res => {
              this.estudiantes = res;
            }
          });
        },
        error: error => {
          toast.error('Error al modificar estudiante');
        }
  
      });

    } else {

      const newEstudiante: Estudiante = {
        nombres: nombres ?? '',
        apellidos: apellidos ?? '',
        tipoDocumentoIdentidad: tipoDocumentoIdentidad,
        numeroDocumento: parseInt(numeroDocumento ?? '0'),
        email: email ?? '',
        telefono: parseInt(telefono ?? '0'),
        genero: genero,
        estado: estado,
        grupoId: grupoId ?? 0,
        fechaCreacion: fechaCreacion,
        fechaUltimaModificacion: fechaUltimaModificacion
      }

      this.estudianteService.createEstudiante(newEstudiante).subscribe({
        next: res => {
          if (res) {
            toast.success('Estudiante creado correctamente');
          }
          this.formGroupEstudiante.reset();
          this.closeOverlay("hs-overlay-estudiantes");
          this.estudianteService.findAllByGrupoId(this.grupoId).subscribe({
            next: res => {
              this.estudiantes = res;
            }
          });
          this.grupoService.findAll().subscribe({
            next: res => {
              this.grupos = res;
            }
          });
        },
        error: error => {
          toast.error('Error al crear estudiante');
        }
      });
    }

  }

  // ----------------------------------------------------------------------------------------------------
  // -----------------------------------------   EDITAR ESTUDIANTE  -------------------------------------
  // ----------------------------------------------------------------------------------------------------

  handleEditarEstudiante(estudianteId: number) {
    this.openOverlay("hs-overlay-estudiantes");
    this.isEditingEstudiante = true;
    this.estudianteId = estudianteId;
    this.estudianteService.findOneEstudianteById(estudianteId).subscribe({
      next: res => {        
        if (res) {

          let estado: string;

          if (res.estado === Estado.ACTIVO) {
            estado = "ACTIVO";
          } else {
            estado = "INACTIVO";
          }

          this.formGroupEstudiante.patchValue({
            nombres: res.nombres,
            apellidos: res.apellidos,
            tipoDocumentoIdentidad: res.tipoDocumentoIdentidad.toString(),
            numeroDocumento: res.numeroDocumento.toString(),
            email: res.email,
            telefono: res.telefono?.toString(),
            genero: res.genero.toString(),
            estado: res.estado.toString(),
            grupoId: res.grupoId
          });
        }
        this.grupoService.findAll().subscribe({
          next: res => {
            this.grupos = res;
          }
        });
      }
    });
    
  }

  //----------------------------------------------------------------------------------------------------
  //-------------------------------------ELIMINAR ESTUDIANTE--------------------------------------------
  //----------------------------------------------------------------------------------------------------

  clickDeleteEstudiante() {

    toast('Está seguro que quiere eliminar este estudiante?', {
      action: {
        label: 'Confirmar',
        onClick: () => {

          this.estudianteService.deleteOneEstudianteById(this.estudianteId).subscribe({
            next: () => {
              toast.success('Estudiante eliminado correctamente');
              this.formGroupEstudiante.reset();
              this.closeOverlay("hs-overlay-estudiantes");
              
              this.estudianteService.findAllByGrupoId(this.grupoId).subscribe({
                next: res => {
                  this.estudiantes = res;
                }
              });

              this.grupoService.findAll().subscribe({
                next: res => {
                  this.grupos = res;
                }
              });
            },
            error: error => {
              toast.error('Error al eliminar estudiante');
            }
          });

        }
      }
    });
  }

  //----------------------------------------------------------------------------------------------------
  //-------------------------------------CLICK GRUPO----------------------------------------------------
  //----------------------------------------------------------------------------------------------------

  isGrupoClicked: boolean = false;
  grupoSelected!: any;

  handleClickGrupo(grupoId: number) {
    this.grupoId = grupoId;
    this.isGrupoClicked = !this.isGrupoClicked;
    if (grupoId !== 0) {
      this.estudianteService.findAllByGrupoId(grupoId).subscribe({
        next: res => {
          this.estudiantes = res;
        }
      });
      this.grupoSelected = this.grupos.find(grupo => grupo.id === grupoId);
    }
  }

  // ----------------------------------------------------------------------------------------------------
  // -------------------------------------- FILTRAR GRUPO ------------------------------------------
  // ----------------------------------------------------------------------------------------------------

  searchTextGrupo: string = '';

  onSearchGrupo(text: string) {
    this.searchTextGrupo = text;
  }

}