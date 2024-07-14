export interface Asistencia {
    id?: number;
    fechaAsistencia: Date;
    estudianteId: number;
    checked: boolean;
    fechaCreacion?: Date;
    fechaUltimaModificacion?: Date;
}