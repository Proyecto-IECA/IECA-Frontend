import { CursoCertificacionI } from './cursos_certificaciones';
import { ExperienciaAcademicaI } from './experiencia_academica';
import { ExperienciaLaboralI } from './experiencia_laboral';
import { HabilidadPostulanteI } from './habilidades_postulante';
import { IdiomaPostulanteI } from './idioma_postulante';
import { PerfilPostulanteI } from './perfil_postulante';
import { ValorPostulanteI } from './valor_postulante';

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
  suscripcion_notificacion?: string;
  cursos_certificaciones?: CursoCertificacionI[];
  experiencias_academicas?: ExperienciaAcademicaI[];
  experiencias_laborales?: ExperienciaLaboralI[];
  habilidades_postulante?: HabilidadPostulanteI[];
  idiomas_postulante?: IdiomaPostulanteI[];
  perfiles_postulante?: PerfilPostulanteI[];
  valores_postulante?: ValorPostulanteI[]; /*Preguntar como temina*/
}
