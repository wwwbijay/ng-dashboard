import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { AppClient } from 'src/app/shared/models/appClient.model';

interface CompanyCode {
  companyCode: string;
}

@Component({
  selector: 'app-create-app-client',
  templateUrl: './create-app-client.component.html',
  styleUrls: ['./create-app-client.component.scss']
})
export class CreateAppClientComponent implements OnInit {

  constructor(
    private _client:ClientService , 
    private dialogRef: MatDialogRef<CreateAppClientComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public _data: CompanyCode
    ) { }

  ngOnInit(): void {
  }

  createClientAppForm = new FormGroup({
    ipAddress: new FormControl('', Validators.required),
    isActive: new FormControl(''),
    appEnvironment: new FormControl('', Validators.required),
  });

  get ipAddress() {
    return this.createClientAppForm.get('ipAddress');
  }

  get isActive() {
    return this.createClientAppForm.get('isActive');
  }

  get appEnvironment() {
    return this.createClientAppForm.get('appEnvironment');
  }

  createClientApp() {
    let formData:AppClient = {
      companyCode: this._data.companyCode,
      ipAddress: this.createClientAppForm.value.ipAddress,
      isActive: this.createClientAppForm.value.isActive,
      appEnvironment: this.createClientAppForm.value.appEnvironment,
    };

    if (!this.createClientAppForm.invalid) {
      this._client.createAppClient(formData).subscribe({
        next: (x: any) => {
          this.dialogRef.close("Created Successfully");
        },
        error: (err: any) => {
          console.log(err);
          this.dialogRef.close(err.error.message);
        },
        complete: () => {},
      });
    }
  }

}
