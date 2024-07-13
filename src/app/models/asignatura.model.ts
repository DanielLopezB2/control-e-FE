import { Estado } from "../enums/estado.enum";
import { Area } from "./area.model";

export interface Asignatura {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: Estado;
    fechaCreacion?: Date;
    fechaUltimaModificacion: Date;
    areaId?: number;
}