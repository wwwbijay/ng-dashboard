import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppClient } from '../shared/models/appClient.model';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  constructor(private http: HttpClient) {}

  getAllClients(company_code: string): Observable<any> {
    return this.http.get(
      BASE_URL +
        '/api/CompanyManager/get-app-clients-all-by-companycode?companyCode=' +
        company_code
    );
  }

  getAppClientById(company_code: string, client_id: string): Observable<any> {
    return this.http.get(
      BASE_URL +
        '/api/CompanyManager/get-app-client?companyCode=' +
        company_code +
        '&clientId=' +
        client_id
    );
  }

  createAppClient(model: AppClient): Observable<any> {
    return this.http.post(
      BASE_URL + '/api/CompanyManager/create-app-client',
      model
    );
  }

  updateAppClient(model: AppClient): Observable<any> {
    return this.http.put(
      BASE_URL + '/api/CompanyManager/update-app-client',
      model
    );
  }

  changeAppSecret(model: any): Observable<any> {
    return this.http.put(
      BASE_URL + '/api/CompanyManager/change-app-client-secret',
      model
    );
  }

  changeAppStatus(model: any): Observable<any> {
    return this.http.put(
      BASE_URL + '/api/CompanyManager/change-app-client-active-status',
      model
    );
  }
}
