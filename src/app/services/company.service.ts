import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private _auth: AuthService) {}

  getToken() {
    let user = this._auth.loadFromLocalStorage();
    return user.token;
  }

  getAll(): Observable<any> {
    return this.http.get(
      baseUrl + '/api/CompanyManager/get-company-all'
    );
  }

  getCompanyByCode(code:string):Observable<any>{
    return this.http.get(
      baseUrl + '/api/CompanyManager/get-company-by-companycode?companyCode='+code
    );
  }

  register(model: any):Observable<any> {
    return this.http.post(baseUrl + '/api/CompanyManager/create-company', model);
  }

  update(model: any):Observable<any> {
    return this.http.put(baseUrl + '/api/CompanyManager/update-company', model);
  }

  changeActiveStatus(model: any):Observable<any> {
    return this.http.put(baseUrl + '/api/CompanyManager/change-company-active-status', model);
  }

}
