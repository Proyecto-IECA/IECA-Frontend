import { VacantesI } from './vacantes';

export class NotificationI {
    id_notificacion?: number;
    titulo?: string;
    mensaje?: string;
    url?: string;
    visto?: boolean;
    fecha_creacion?: string;
    Vacante?: VacantesI;
}