import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ListDialogComponent } from '../dialogs/list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../customer.model';
import { SnackService } from 'src/app/services/snack.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers;
  newCustomer;

  constructor(
    private seo: SeoService,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private snack: SnackService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Customers List',
      description: 'A list of customers',
    });
    this.customers = this.db
      .collection('customers')
      .valueChanges({ idField: 'id' });
  }

  async openListDialog(): Promise<void> {
    const canCreate = await this.canCreateCustomer();
    if (!canCreate) {
      this.snack.permissionError();
    } else {
      const dialogRef = this.dialog.open(ListDialogComponent, {
        width: '350px',
        data: {
          bio: '',
          image: '',
          name: '',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const shouldCreate = !!result.bio && !!result.name && !!result.image;
          if (shouldCreate) {
            this.createCustomer(result);
          } else {
            this.snack.allFieldsError();
          }
        }
      });
    }
  }

  async canCreateCustomer(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    const uid = user!.uid;
    if (uid == '1ESwTeSp3Je3Hdia7WHuAXNUuJW2') {
      return true;
    } else {
      return false;
    }
  }

  async createCustomer(data: Customer) {
    return this.db.collection('customers').add({
      ...data,
    });
  }
}
