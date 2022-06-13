import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { AppClientUpdate } from 'src/app/shared/models/appClient.model';

interface CompanyCode {
  companyCode: string;
  clientId: string;
}

@Component({
  selector: 'app-edit-app-client',
  templateUrl: './edit-app-client.component.html',
  styleUrls: ['./edit-app-client.component.scss'],
})
export class EditAppClientComponent implements OnInit {
  accountUser: any;
  constructor(
    private _client: ClientService,
    private dialogRef: MatDialogRef<EditAppClientComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public _data: CompanyCode,
    private _auth: AuthService
  ) {}

  updateClientAppForm = new FormGroup({
    ipAddress: new FormControl('', Validators.required),
    isActive: new FormControl(''),
    appEnvironment: new FormControl('', Validators.required),
  });

  get ipAddress() {
    return this.updateClientAppForm.get('ipAddress');
  }

  get isActive() {
    return this.updateClientAppForm.get('isActive');
  }

  get appEnvironment() {
    return this.updateClientAppForm.get('appEnvironment');
  }

  ngOnInit(): void {
    this.getAppClientByCode();
    this.accountUser = this._auth.loadFromLocalStorage();
  }

  getAppClientByCode() {
    this._client
      .getAppClientById(this._data.companyCode, this._data.clientId)
      .subscribe({
        next: (x: any) => {
          this.updateClientAppForm.setValue({
            ipAddress: x.ipAddress,
            isActive: x.isActive,
            appEnvironment: x.appEnvironment,
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  updateClientApp() {
    let data:AppClientUpdate = {
      companyCode: this._data.companyCode,
      clientId: this._data.clientId,
      ipAddress:this.updateClientAppForm.value.ipAddress,
      isActive: this.updateClientAppForm.value.isActive,
      appEnvironment: this.updateClientAppForm.value.appEnvironment,
    }
    console.log(data);

    this._client.updateAppClient(data).subscribe({
      next: (x:any)=>{
        this.dialogRef.close("Updated Successfully");
      },
      error:(err:any)=>{
        console.log(err);
        this.dialogRef.close(err.error.message);
      }
    });
    
  }
}
