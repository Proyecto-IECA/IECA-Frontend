import { UsuarioI } from './usuario';

export class VacantesI {
    id_vacante?: number;
    puesto?: string;
    fecha_publicacion?: string;
    imagen?: string;
    sueldo?: string;
    descripcion?: string;
    disponible?: boolean;
    modalidad?: string;
    nivel?: string;
    vistas?: number;
    publicada?: number;
    id_usuario_fk?: number;
    id_sucursal_fk?: number;
    Vacantes_Favoritas?: any;
    Usuario?: UsuarioI;
}
