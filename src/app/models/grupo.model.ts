import { Estado } from "../enums/estado.enum";
import { Horario } from "../enums/horario.enum";
import { Estudiante } from "./estudiante.model";

export interface Grupo {
    id?: number;
    nombre: string;
    horario: Horario;
    estado: Estado;
    fechaCreacion?: Date;
    fechaUltimaModificacion?: Date;
    estudiantes?: Estudiante[];
}