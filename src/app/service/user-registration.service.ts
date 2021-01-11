import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { RegistrationVM } from '../model/RegistrationVM';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  auth_token = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  });
  _url = environment.apiBaseUrl + 'api/Login/Registration';
  constructor(private _http: HttpClient) {

  }
  enroll(reg: RegistrationVM) {
    console.log(reg);
    return this._http.post<any>(this._url, reg);
  }
}
