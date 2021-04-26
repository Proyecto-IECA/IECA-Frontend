import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { VacancyService } from './vacancy.service';
import { SucursalesI } from '../../models/sucursales';
import { AuthResponseI } from '../../models/auth-response';
import { PerfilI } from '../../models/perfil';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Element {
  value: string,
  viewValue: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];




@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: [ './create-vacancy.component.css'
  ]
})
export class CreateVacancyComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  sucursales: SucursalesI[];
  perfiles: PerfilI[];
  idVacante = 1;
  type = 'Vacante';

  constructor(
      private vacanteService: VacancyService
  ) {
  }

  ngOnInit(): void {
    this.vacanteService.getSucursales().subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.sucursales = resp.data;
        }
      }
    )

    this.vacanteService.getPerfilesVacantes(1).subscribe(
      (resp: AuthResponseI) => {
        if (resp.status) {
          this.perfiles = resp.data;
        }
      }
    )
  }



  capturarImage(event) {
    console.log(event);
  }

}
