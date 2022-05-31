import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:Boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  inputLabelFix(){

  }

  onSubmit() {
    this.loading = true;
    var login_model = {
      userName: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if (!this.loginForm.invalid) {
      this._auth.login(login_model).subscribe({
        next: (rawToken: any) => {},
        error: (err: Error) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this._router.navigate(['/']);
        },
      });
    }
  }

}
