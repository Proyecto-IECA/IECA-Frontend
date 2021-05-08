import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeeCompanyService } from './see-company.service';
import { UsuarioI } from '../../models/usuario';


@Component({
  selector: 'app-see-company',
  templateUrl: './see-company.component.html',
  styles: [`
    .example-card {
      max-width: 55%;
      margin-bottom: 20px;
    }

    .example-header-image {
      background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');
      background-size: cover;
    }
  `]
})
export class SeeCompanyComponent implements OnInit {

  //  ---------- VARIABLES ---------- //
  company: UsuarioI;

  constructor
  (private activatedRoute: ActivatedRoute,
   private seeCompanyService: SeeCompanyService,
   private router: Router,
  ) {
    this.getId();
  }

  ngOnInit(): void {
  }

  getId(): void {
    this.activatedRoute.params.subscribe(
        (params) => this.getCompany(params['id'])
    );
  }

  getCompany(id: number): void {
    this.seeCompanyService.getCompany(id).subscribe(
        response => this.company = response.data,
        error => console.log(error)
    );
  }

}
