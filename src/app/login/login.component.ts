import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../auth/IUser';
import { UserModel } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading:Boolean = false;
  jwthelper = new JwtHelperService();
  currentUser!: UserModel;
  errorMessage!: string;
  loginError:Boolean = false;

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

  onSubmit() {
    this.loading = true;
    var login_model = {
      userName: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    if(!this.loginForm.invalid){
      let authFlow = this._auth.login(login_model);
      authFlow.subscribe({
        next: (user: any) =>{
          const decodedToken = this.jwthelper.decodeToken(user.token);
          let userProfile:UserModel = {
            token: user.token,
            companyCode: decodedToken.companycode,
            userName: decodedToken.username,
            companyName: decodedToken.companyname,
            role: decodedToken.clientrole,
          }
          this._auth.saveToLocalStorage(userProfile);
          this._router.navigate(['/']);
        },
        error: (err:any) =>{
          this.loginError = true;
          this.errorMessage = err.error.message
         }
      });
    }
    
   
  }

}
