import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['../../../assets/pages/css/light-bootstrap-dashboard.css']
})
export class HeadbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.router.navigate(['auth']);
    this.authService.logout();
    console.log('logout');
  }
}
