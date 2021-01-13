import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from 'src/environments/environment';
import { MessageVM } from '../model/MesssageVM';
@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    public fromid: string | undefined;
    public toid: string | undefined;
    public message: string | undefined;
    public usersmessage: Array<MessageVM> = [];
    private hubConnection: any = signalR.HubConnection;
    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.ws_url)
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch((err: any) => console.log('Error while starting connection: ' + err))
    }
    public broadcastChat = (fromid: string, toid: string, message: string) => {
        console.log(fromid, toid, message);
        this.hubConnection.invoke('SendMessage', fromid, toid, message)
            .catch((err: any) => console.error(err));
    }
    public invokeConnection = () => {
        this.hubConnection.on('SendMessage', (fromid: string, toid: string, message: string) => {
            let msg = new MessageVM(new Date().toJSON(), fromid, '', true, message, 1, toid);
        })
    }
}