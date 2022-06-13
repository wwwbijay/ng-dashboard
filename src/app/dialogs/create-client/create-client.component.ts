import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})

export class CreateClientComponent implements OnInit {
  createClientForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl(),
    role: new FormControl('client'),
  });

  get companyName() {
    return this.createClientForm.get('companyName');
  }

  get phoneNumber() {
    return this.createClientForm.get('phoneNumber');
  }

  get userName() {
    return this.createClientForm.get('userName');
  }

  get email() {
    return this.createClientForm.get('email');
  }

  get password() {
    return this.createClientForm.get('password');
  }

  get role() {
    return this.createClientForm.get('role');
  }

  constructor(
    private _company: CompanyService,
    private dialogRef: MatDialogRef<CreateClientComponent>
  ) {}

  ngOnInit(): void {}

  createClient() {
    console.log(1);
    
    let formData = {
      companyName: this.createClientForm.value.companyName,
      userName: this.createClientForm.value.userName,
      email: this.createClientForm.value.email,
      phoneNumber: this.createClientForm.value.phoneNumber,
      password: this.createClientForm.value.password,
      address: this.createClientForm.value.address,
      role: this.createClientForm.value.role,
    };
    console.log(formData);
    
    if (!this.createClientForm.invalid) {
      this._company.register(formData).subscribe({
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
