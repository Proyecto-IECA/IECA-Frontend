import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UsuarioI } from "../../../../models/usuario";
import Swal from "sweetalert2";
import { AuthResponseI } from "../../../../models/auth-response";
import { UserService } from "./user.service";
import { NotifierService } from '../../../../services/notifier.service';

interface Sexo {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-user-form",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  @Input() usuario: UsuarioI;
  public selected;
  public formSubmitted = false;

  public userForm = this.formBuilder.group({
    nombre: ["", Validators.required],
    apellido_paterno: ["", Validators.required],
    apellido_materno: ["", Validators.required],
    sexo: ["", Validators.required],
    fecha_nacimiento: ["", Validators.required],
    telefono_casa: [""],
    telefono: [""],
    codigo_postal: [""],
    domicilio: [""],
    ciudad: [""],
    pais: [""],
  });

  sexo: Sexo[] = [
    { value: "H", viewValue: "Hombre" },
    { value: "M", viewValue: "Mujer" },
    { value: "X", viewValue: "Prefiero no decirlo" },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.userForm.reset(this.usuario);
  }

  updateUser() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      this.userService.updateUsuario(this.userForm.value).subscribe(
        (resp: AuthResponseI) => {
          if (resp.status) {
            this.doneMassage("Información actualizada");
            //this.notifierService.showNotification('Información Actualizada', 'done', 'success-snack');
            this.formSubmitted = false;
          } else {
            this.errorPeticion(resp.data);
          }
        },
        (error) => this.errorServer(error)
      );
    } else {
      this.errorMassage();
    }
  }

  resetForm() {
    this.userForm.reset(this.usuario);
    this.formSubmitted = false;
  }

  campoNoValido(campo: string): boolean {
    if (this.userForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  //  ---------- MENSAJES ---------- //
  errorServer(error: any): void {
    // Lo sentimos su petición no puede ser procesada, favor de ponerse en contacto con soporte técnico
    Swal.fire({
      icon: "error",
      title: "Petición no procesada",
      text: `Vuelve a intentar de nuevo.
      Si el error persiste, comuníquese con el soporte técnico.`,
    });
    console.log(error);
  }

  errorMassage(): void {
    Swal.fire({
      icon: "error",
      title: "Verifica el formulario",
      text: "Para actualizar, completa el formulario",
      showConfirmButton: false,
      timer: 2700,
    });
  }

  doneMassage(message: string): void {
    Swal.fire({
      icon: "success",
      title: "Cambios Actualizados",
      text: message,
      showConfirmButton: false,
      timer: 2700,
    });
  }

  errorPeticion(error: string): void {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error,
      showConfirmButton: false,
      timer: 2700,
    });
  }
}
