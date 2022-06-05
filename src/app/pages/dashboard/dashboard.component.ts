import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CreateClientComponent } from '../../dialogs/create-client/create-client.component';
import { DeleteClientComponent } from '../../dialogs/delete-client/delete-client.component';
import { EditClientComponent } from '../../dialogs/edit-client/edit-client.component';
import { ClientsService } from '../../services/clients.service';
import { ClientModel } from '../../shared/models/client.model';
import { UserModel } from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'clientCode',
    'clientName',
    'userName',
    'role',
    'actions',
  ];
  clientLists!: Array<ClientModel>;
  currentUser!:UserModel;

  constructor(
    public _router: Router,
    private _auth: AuthService,
    private _client: ClientsService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this._auth.loadFromLocalStorage();
    this.getAllClients();
  }

  getAllClients() {
    this._client.getAll().subscribe({
      next: (x: any) => {
        this.clientLists = [...x];
        console.log(this.clientLists);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  newClient() {
    const dialogRef = this._dialog.open(CreateClientComponent, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((x: any) => {
      if ( !!x ){
        console.log(x);
        this.processData(x);
      }
        
    });
  }

  updateClient(code: any) {
    const dialogRef = this._dialog.open(EditClientComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteClient(code: any) {
    const dialogRef = this._dialog.open(DeleteClientComponent, {
      width: '50%',
    });
  }

  processData(data:any){
    this.OpenSnackBar(data);
    // this.getAllClients();
  }

  OpenSnackBar(message:any){
    this._snackBar.open(message, 'x', {
      duration: 4 * 1000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['alert', 'alert-success'],
    });
  }

}
