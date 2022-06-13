import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CreateAppClientComponent } from 'src/app/dialogs/create-app-client/create-app-client.component';
import { EditAppClientComponent } from 'src/app/dialogs/edit-app-client/edit-app-client.component';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangeSecretComponent } from 'src/app/dialogs/change-secret/change-secret.component';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.scss'],
})
export class SingleCompanyComponent implements OnInit {
  accountCompany:any;
  clientLists: any;
  displayedColumns: string[] = [
    'clientId',
    'clientSecret',
    'appEnvironment',
    'ipAddress',
    'isActive',
    'actions',
  ];
  companyCode!: string;

  company: any;
  appClients: any;

  constructor(
    _route: ActivatedRoute,
    private _clients: ClientService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _auth: AuthService
  ) {
    _route.params.subscribe((params: any) => {
      this.companyCode = params['code'];
    });
  }

  ngOnInit(): void {
    this.getAllClients();
    this.accountCompany = this._auth.loadFromLocalStorage();
  }

  getAllClients() {
    this._clients.getAllClients(this.companyCode).subscribe({
      next: (x: any) => {
        this.company = x;
        this.appClients = x.appClients;
        console.log(this.appClients);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  newClientApp() {
    const dialogRef = this._dialog.open(CreateAppClientComponent, {
      width: '50%',
      data: { companyCode: this.companyCode }
    });
    dialogRef.afterClosed().subscribe((x: any) => {
      if (!!x) {
        this.processData(x);
      }
    });
  }

  updateClientApp(clientId: string) {
    const dialogRef = this._dialog.open(EditAppClientComponent, {
      width: '50%',
      data: { companyCode: this.companyCode, clientId: clientId  },
    });

    dialogRef.afterClosed().subscribe((x: any) => {
      if (!!x) {
        this.processData(x);
      }
    });
  }
  changeSecret(clientId: string){
    const dialogRef = this._dialog.open(ChangeSecretComponent, {
      width: '400px',
      data: { companyCode: this.companyCode, clientId: clientId  },
    });

    dialogRef.afterClosed().subscribe((x: any) => {
      if (!!x) {
        this.processData(x);
      }
    });
  }

  processData(data: any) {
    this.OpenSnackBar(data);
    this.getAllClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  OpenSnackBar(message: any) {
    this._snackBar.open(message, 'x', {
      duration: 4 * 1000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['alert', 'alert-success'],
    });
  }

  slideToggle(e: any, clientid: string) {
    let data = {
      companyCode: this.companyCode,
      clientId: clientid,
      isActive: e.checked,
    };
    this._clients.changeAppStatus(data).subscribe({
      next: (x: any) => {
        this.OpenSnackBar(x.message);
      },
      error: (err: any) => {
        this.OpenSnackBar(err.error.message);
      },
    });
  }
}
