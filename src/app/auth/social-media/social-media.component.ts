import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  accountIECA(): void {
    Swal.fire({
      title: 'Vincula tu cuenta de IECA',
      text: 'Escribe tu correo electrónico',
      input: 'email',
      inputPlaceholder: 'ejemplo@swal.com',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Validar',
      showLoaderOnConfirm: true,
    })
  }

}
