import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { SendMessageVM } from '../model/SendMessageVM';
@Injectable({
    providedIn: 'root'
})
export class MessageService {

    auth_token = localStorage.getItem("Token");

    httpOptions = {
        headers: new HttpHeaders()
            .set('Authorization', '' + this.auth_token).set('Content-Type', 'application/json')
    }
    _url_getuser = environment.apiBaseUrl + 'api/Message/GetUser';
    _url_getsendmessagebyuser = environment.apiBaseUrl + 'api/Message';
    constructor(private _http: HttpClient) {

    }
    getUser() {
        return this._http.get<any>(this._url_getuser, this.httpOptions);
    }
    getMessageByUser(userid: string) {
        const params = new HttpParams()
            .set('toid', userid)
        return this._http.get<any>(this._url_getsendmessagebyuser, { headers: this.httpOptions.headers, params: params });
    }
    SendMessage(model: SendMessageVM) {
        return this._http.post<any>(this._url_getsendmessagebyuser, model, { headers: this.httpOptions.headers });
    }
}
