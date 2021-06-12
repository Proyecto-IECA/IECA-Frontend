import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { AuthResponseI } from '../../models/auth-response';
import { NotificationI } from '../../models/notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notificaciones: NotificationI[] = [];

  constructor(
    private notifService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.notifService.getNotificaciones().subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.notificaciones = resp.data;
      }
   })
  }

  verNotificacion(idNotificacion, url) {
    this.notifService.verNotificacion(idNotificacion).subscribe((resp: AuthResponseI) => {
      if (resp.status) {
        this.router.navigate([url]);
      }
    })
  }

}
