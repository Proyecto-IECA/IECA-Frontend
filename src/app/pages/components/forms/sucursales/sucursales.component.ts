import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  
  public formSubmitted = false;

  public sucursalForm = this.formBuilder.group(
    {
      etiqueta: ['', Validators.required],
      direccion: ['', Validators.required],
    }
  )
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string): boolean {
    if(this.sucursalForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }  else {
      return false;
    }
  };

  actionForm() {
    this.formSubmitted = true;    
  }

}
