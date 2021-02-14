import { Component, OnInit } from '@angular/core';
import { EmpresaI } from '../services/empresa';
import { UsuarioI } from '../services/usuario';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../assets/css/auth-style.css']
})
export class AuthComponent implements OnInit {

  //  ---------- OBJETOS ---------- //
  usuario: UsuarioI;
  empresa: EmpresaI;

  //  ---------- VARIABLES ---------- //
  register = true; // Siempre en falso
  type: string;

  constructor() {
    this.type = 'Soy...';
  }

  ngOnInit(): void {
  }

  //  ---------- VALIDADORES ---------- //

  //  ---------- MÉTODOS ---------- //
  // Cambiar el tipo de formulario (Ingresar o registrarte)
  formulario(): void {
    this.register = !this.register;
    this.type = 'Soy...';
  }

  // Revisa que metodo (login o registro) se va a usar y el tipo (usuario o empresa)
  evaluateForm(metodo: string, type: string): void {
    if (metodo === 'login'){
      // evalua el tipo
      this.objectType(type);
      // Mostrar errores (Validación)
    }
    if (metodo === 'registro'){
      // evalua el tipo
      this.objectType(type);
      /// Mostrar errores (Validación)
    }
  }

  // Evalua el tipo de objeto a usar
  objectType(type: string): void {
    if (this.type === 'u') {
    }
    if (this.type === 'e') {
    }
  }

  // Ingresar
  login(): void {
  }

  // Registrarse
  registro(): void {
  }

}
