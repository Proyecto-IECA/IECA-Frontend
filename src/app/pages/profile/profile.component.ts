import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getPostulante(15, 'carlosorozco4565@gmail.com').subscribe((resp: any) => {
      if(resp.status) {
        console.log(resp.data);
      } else {
        console.log(resp.message);
      }
    });
  }

}
