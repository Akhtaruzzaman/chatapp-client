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
            .set('Authorization', 'Bearer ' + this.auth_token)
    }

    _url_getuser = environment.apiBaseUrl + 'api/Message/GetUser';
    constructor(private _http: HttpClient) {

    }
    getUser() {
        let headers = new HttpHeaders().append('Content-Type',  'application/json'); // create header object
        headers = headers.append('Authorization', 'Bearer ' + this.auth_token);
        return this._http.get<any[]>(this._url_getuser, { headers: headers });
    }
}
