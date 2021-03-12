import { UsuarioI } from './usuario';
import { EmpresaI } from './empresa';
import { ExperienciaLaboralI } from './experiencia_laboral';
import { ExperienciaAcademicaI } from './experiencia_academica';
import { CursoCertificacionI } from './cursos_certificaciones';


export class AuthResponseI {
  status: boolean;
  message: string;
  data: any;
  token?: string;
  refreshToken?: string;
}
