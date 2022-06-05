import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  createClient = new FormGroup({
    companyName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    role: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
