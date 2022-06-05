import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient, private _auth: AuthService) {}

  getToken() {
    let user = this._auth.loadFromLocalStorage();
    return user.token;
  }

  getAll(): Observable<any> {
    return this.http.get(
      baseUrl + '/api/CompanyManager/get-company-all',
      this.options
    );
  }

  register(model: any) {
    return this.http.post(baseUrl + '/api/CompanyManager/create-company', model, this.options);
  }

}
