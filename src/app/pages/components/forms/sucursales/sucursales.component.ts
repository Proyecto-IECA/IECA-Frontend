import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { EmpresaService } from '../../../../services/empresa.service';
import { AuthResponseI } from '../../../../models/auth-response';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  public formSubmitted = false;

  public sucursalForm = this.formBuilder.group(
    {
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
    }
  );

  @ViewChild('placesRef') placesRef: GooglePlaceDirective; // autocompletar dirección

  constructor(private formBuilder: FormBuilder,
              private branchesSvc: EmpresaService) {  }

  ngOnInit(): void {
    // this.loadData();
  }

  campoNoValido(campo: string): boolean {
    if (this.sucursalForm.get(campo).invalid && this.formSubmitted) {
      return true;
    }  else {
      return false;
    }
  };

  loadData() {

    this.branchesSvc.readBranches(3).subscribe(
        (result: AuthResponseI) => {
          console.log(result);
        }
    );

  }

  createBranches(): boolean {

    if (this.sucursalForm.invalid) {
      this.sucursalForm.markAllAsTouched();
      return this.formSubmitted = false;
    }

    console.log(this.sucursalForm.value);
    this.branchesSvc.createBranches(this.sucursalForm.value).subscribe(
        (result: AuthResponseI) => {
          console.log(result);
        }
    );

    return this.formSubmitted = true;
  }

  // Autocompletar la dirección en la ubicación
  public handleAddressChange(address: Address) {
    // Do some stuff
    // console.log(address);

    // Asignar el valor de google al formulario de registerEmpresaForm
    this.sucursalForm.reset({
      nombre: this.sucursalForm.value.nombre,
      ubicacion: `${address.name}, ${address.formatted_address}`,
    });
  }

}
