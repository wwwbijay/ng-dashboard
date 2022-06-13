import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';

interface CompanyCode {
  companyCode: string;
  clientId: string;
}

@Component({
  selector: 'app-change-secret',
  templateUrl: './change-secret.component.html',
  styleUrls: ['./change-secret.component.scss'],
})
export class ChangeSecretComponent implements OnInit {
  constructor(
    private _client: ClientService,
    private dialogRef: MatDialogRef<ChangeSecretComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public _data: CompanyCode
  ) {}

  ngOnInit(): void {}

  changeSecret() {
    let data = {
      companyCode: this._data.companyCode,
      clientId: this._data.clientId,
    };
    console.log(data);
    
    this._client.changeAppSecret(data).subscribe({
      next:(x:any)=>{
        console.log(x);
        this.dialogRef.close("Secret changed successfully.");
      },
      error:(err:any)=>{
        console.log(err);
        this.dialogRef.close(err.error.message);
      },
    });
  }
}
