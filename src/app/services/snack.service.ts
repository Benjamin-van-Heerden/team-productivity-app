import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBar.open('You must be logged in to acces this feature', 'Ok', {
      duration: 5000,
    });

    return this.snackBar
      ._openedSnackBarRef!.onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }

  permissionError() {
    this.snackBar.open('You do not have sufficient permissions to access this feature', 'Ok', {
      duration: 5000,
    });
  }

  allFieldsError() {
    this.snackBar.open('All fields are required for creating a new employee', 'Ok', {
      duration: 5000,
    });
  }
}
