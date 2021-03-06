export class UsuarioI {
  id_postulante?: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  fecha_nacimiento?: Date;
  sexo?: string;
  telefono_casa?: string;
  telefono_celular?: string;
  pais?: string;
  codigo_postal?: string;
  ciudad?: string;
  domino?: string;
  foto_perfil?: string;
  cv?: string;
  calificacion?: number;
  email: string;
  email_validado?: boolean;
  pass: string;
  suscripcion_notificacion?: string; /*Preguntar como temina*/
}
