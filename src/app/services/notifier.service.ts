import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from 'app/pages/components/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, icon: string, type: 'error-snack' | 'success-snack') {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        icon: icon,
      },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type
    });
  }
}
