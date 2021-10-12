import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-list-dialog',
  template: `
    <h1 mat-dialog-title>New Customer</h1>
    <div mat-dialog-content class="content">
      <mat-form-field class="name-input" appearance="fill">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="customer.name"/>
      </mat-form-field>

      <mat-form-field class="bio-input" appearance="fill">
        <mat-label>Bio</mat-label>
        <textarea matInput [(ngModel)]="customer.bio"></textarea>
      </mat-form-field>

      <mat-form-field class="img-input" appearance="fill">
        <mat-label>Image</mat-label>
        <input matInput [(ngModel)]="customer.image"/>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
    <button mat-raised-button [mat-dialog-close]="customer"><mat-icon>add_circle</mat-icon>Add</button>
    <button mat-raised-button (click)="onCancel()"><mat-icon>cancel</mat-icon>Cancel</button>
    </div>
  `,
  styleUrls: ["./list-dialog.component.scss"],
})
export class ListDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: Customer
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
