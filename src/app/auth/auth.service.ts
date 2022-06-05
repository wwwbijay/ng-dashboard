import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  userProfile: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({
    token: '',
    companyCode: '',
    userName: '',
    companyName: '',
    role: '',
  });

  constructor(private http: HttpClient, private _router: Router) {}

  register(model: any) {
    return this.http.post(this.baseUrl + '/api/CompanyManager/create-company', model);
  }
  isLoggedIn():boolean {
    const user = this.loadFromLocalStorage();
    return !this.jwthelper.isTokenExpired(user.token);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/api/CompanyManager/company-login', model);
  }

  saveToLocalStorage(user: UserModel) {
    this.userProfile.next(user);
    localStorage.setItem('profile', JSON.stringify(user));
  }

  loadFromLocalStorage(): UserModel {
    if (!this.userProfile.value.token) {
      let fromLocalStorage = localStorage.getItem('profile');
      if (!!fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  logout() {
    localStorage.removeItem('profile');
    this.userProfile.next({
      token: '',
      companyCode: '',
      userName: '',
      companyName: '',
      role: '',
    });
    
    this._router.navigate(['login']);
  }
}
