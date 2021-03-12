import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from '../../../services/usuario.service';
import { CursoCertificacionI } from '../../../models/cursos_certificaciones';
@Component({
  selector: 'app-curso-certificacion-form',
  templateUrl: './curso-certificacion.component.html',
  styleUrls: ['./curso-certificacion.component.css']
})
export class CursoCertificacionComponent implements OnInit {

  public formSubmitted = true;

  public certificadoForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      constancia: ['', Validators.required],
      link: ['']
    }
  )

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }
  campoNoValido(campo: string): boolean {
    if(this.certificadoForm.get(campo).invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }

  loadData(cursoCertificacion: CursoCertificacionI) {
    this.certificadoForm.reset(cursoCertificacion);
  }
}
