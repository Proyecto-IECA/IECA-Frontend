import { UsuarioI } from './usuario';
import { EmpresaI } from './empresa';

export class AuthResponseI {
  status: boolean;
  message: string;
  data: UsuarioI | EmpresaI;
  token?: string;
  refreshToken?: string;
}
