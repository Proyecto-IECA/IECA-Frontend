import { CursoCertificacionI } from './cursos_certificaciones';
import { ExperienciaAcademicaI } from './experiencia_academica';
import { ExperienciaLaboralI } from './experiencia_laboral';
import { HabilidadPostulanteI } from './habilidades_postulante';
import { IdiomaPostulanteI } from './idioma_postulante';
import { PerfilPostulanteI } from './perfil_postulante';
import { ValorPostulanteI } from './valor_postulante';

export class UsuarioI {
  //Atributos generales entre Empresa y Postulante
  id_usuario?: number;
  nombre?: string;
  telefono?: string;
  email: string;
  pass?: string;
  email_validado?: boolean;
  sups_notificacion?: string;
  tipo_usuario?: string;
  foto_perfil?: string;
  calificacion?: number;

  //Atributos de Usuario
  apellido_paterno?: string;
  apellido_materno?: string;
  fecha_nacimiento?: Date;
  cv?: string;
  pais?: string;
  codigo_postal?: string;
  ciudad?: string;
  domicilio?: string;
  telefono_casa?: string;
  sexo?: string;

  //Atributos de Empresa
  administrador?: string;
  ubicacion?: string;
  giro?: string;
  pagina_web?: string;
  numero_sucursales?: number;

  //Por Eliminar
  cursos_certificaciones?: CursoCertificacionI[];
  experiencias_academicas?: ExperienciaAcademicaI[];
  experiencias_laborales?: ExperienciaLaboralI[];
  habilidades_postulante?: HabilidadPostulanteI[];
  idiomas_postulante?: IdiomaPostulanteI[];
  perfiles_postulante?: PerfilPostulanteI[];
  valores_postulante?: ValorPostulanteI[]; 
  /*Preguntar como temina*/
}
