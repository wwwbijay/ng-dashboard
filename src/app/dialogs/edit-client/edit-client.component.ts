import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

interface CompanyCode {
  code: string;
}

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {

  editClientForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    status: new FormControl(''),
    role: new FormControl('', Validators.required),
  });

  get companyName() {
    return this.editClientForm.get('companyName');
  }

  get phoneNumber() {
    return this.editClientForm.get('phoneNumber');
  }

  get userName() {
    return this.editClientForm.get('userName');
  }

  get email() {
    return this.editClientForm.get('email');
  }

  get password() {
    return this.editClientForm.get('password');
  }

  get role() {
    return this.editClientForm.get('role');
  }
  constructor(
    private _company: CompanyService,
    private dialogRef: MatDialogRef<EditClientComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public _data: CompanyCode
  ) {}

  ngOnInit(): void {
    this.getClientByCode();
  }

  getClientByCode() {
    this._company.getCompanyByCode(this._data.code).subscribe({
      next: (x: any) => {
        this.editClientForm.setValue({
          companyName: x.companyName,
          userName: x.userName,
          email: x.email,
          phoneNumber: x.phoneNumber,
          address: x.address,
          status: x.status,
          role: x.role,
        });
        console.log(x);
        
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateClient() {
    let formData = {
      companyCode: this._data.code,
      companyName: this.editClientForm.value.companyName,
      userName: this.editClientForm.value.userName,
      email: this.editClientForm.value.email,
      phoneNumber: this.editClientForm.value.phoneNumber,
      status: this.editClientForm.value.status,
      address: this.editClientForm.value.address,
      role: this.editClientForm.value.role,
    };

    if (!this.editClientForm.invalid) {
      this._company.update(formData).subscribe({
        next: (x: any) => {
          this.dialogRef.close(x.message);
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
