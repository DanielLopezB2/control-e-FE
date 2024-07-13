import { Estado } from "../enums/estado.enum";
import { Genero } from "../enums/genero.enum";
import { TipoDocumentoIdentidad } from "../enums/tipoDocumentoIdentidad.enum";
import { Grupo } from "./grupo.model";

export interface Estudiante {
    id?: number;
    nombres: string;
    apellidos: string;
    tipoDocumentoIdentidad: TipoDocumentoIdentidad;
    numeroDocumento: number;
    email: string;
    telefono?: number;
    genero: Genero;
    estado: Estado;
    fechaCreacion?: Date;
    fechaUltimaModificacion?: Date;
    grupoId?: number;
    grupo?: Grupo;
}