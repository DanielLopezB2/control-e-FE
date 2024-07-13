import { Estado } from "../enums/estado.enum";
import { Asignatura } from "./asignatura.model";

export interface Area {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: Estado;
    fechaCreacion?: Date;
    fechaUltimaModificacion: Date;
    asignaturas?: Asignatura[];
}