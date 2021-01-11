import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    auth_token = localStorage.getItem("Token");
    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`,
    }
    httpOptions = {
        headers: new HttpHeaders()
          .set('Authorization',  'Bearer ' +this.auth_token)
      }

    _url_getuser = environment.apiBaseUrl + 'api/Message/GetUser';
    constructor(private _http: HttpClient) {

    }
    getUser() {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' +this.auth_token
            }),
            queryParams: { returnUrl: "test"}
          };
        return this._http.get(this._url_getuser, httpOptions);
    }
}
