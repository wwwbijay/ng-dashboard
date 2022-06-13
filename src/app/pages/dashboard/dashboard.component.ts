import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CreateClientComponent } from '../../dialogs/create-client/create-client.component';
import { EditClientComponent } from '../../dialogs/edit-client/edit-client.component';
import { CompanyService } from '../../services/company.service';
import { ClientModel } from '../../shared/models/client.model';
import { UserModel } from '../../shared/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  pageTitle: string = "Dashboard";
  displayedColumns: string[] = [
    'clientCode',
    'clientName',
    'userName',
    'role',
    'isActive',
    'actions',
  ];
  clientLists!: Array<ClientModel>;
  currentUser!:UserModel;

  dataSource!: Array<ClientModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public _router: Router,
    private _auth: AuthService,
    private _client: CompanyService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.currentUser = this._auth.loadFromLocalStorage();
    this.getAllClients();
  }

  getAllClients() {
    this._client.getAll().subscribe({
      next: (x: any) => {
        this.clientLists = [...x];
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
        
        this.processData(x);
      }
        
    });
  }

  updateClient(code: any) {
    const dialogRef = this._dialog.open(EditClientComponent, {
      width: '50%',
      data: { code: code }
    });

    dialogRef.afterClosed().subscribe((x: any) => {
      if ( !!x ){
        
        this.processData(x);
      }
    });
  }

  processData(data:any){
    this.OpenSnackBar(data);
    this.getAllClients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  OpenSnackBar(message:any){
    this._snackBar.open(message, 'x', {
      duration: 4 * 1000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: ['alert', 'alert-success'],
    });
  }

  slideToggle(e:any, cc:string){
    let data = {
      companyCode: cc,
      status: e.checked
    }
    this._client.changeActiveStatus(data).subscribe({
      next:(x:any)=>{
        console.log(x);
        this.OpenSnackBar(x.message);
      },
      error:(err:any)=>{
        this.OpenSnackBar(err.error.message)
      }
    });
    
  }

}
