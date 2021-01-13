import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/jwtAuth/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { MessageVM } from 'src/app/model/MesssageVM';
import { SendMessageVM } from 'src/app/model/SendMessageVM';
import * as signalR from "@aspnet/signalr";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private hubConnection: any = signalR.HubConnection;
  @ViewChild('messagediv') messagediv: any;
  user;
  search;
  messageuser = [];
  usersmessage: Array<MessageVM> = [];
  messages;
  toid;
  fromid: any = '';
  constructor(private service_auth: AuthService, private service_message: MessageService) {
    this.user = service_auth.getUserName;
    this.search = '';
    this.messages = '';
    this.toid = '';
    this.fromid = localStorage.getItem("UserId");
  }
  ngOnInit(): void {
    this.service_message.getUser().subscribe(data => {
      console.log("Success", data)
      this.setactive(data, '');
      this.messageuser = data;
    }, error => console.log("Error", error));

    this.startConnection();
    this.invokeConnection();
  }
  userClickForChat(userid: string) {
    this.setactive(this.messageuser, userid);
  }

  loadMessageByUser(userid: string) {
    this.service_message.getMessageByUser(userid).subscribe(data => {
      console.log("Success", data)
      this.usersmessage = data;
      document.getElementById("scrollbottom")?.scrollIntoView();
    }, error => console.log("Error", error));
  }

  sendmessage() {
    if (this.messages && this.toid) {
      let sendmsg = new SendMessageVM(this.messages, this.toid)
      this.service_message.SendMessage(sendmsg).subscribe(data => {
        this.fromid = localStorage.getItem("UserId");
        let msg = new MessageVM(new Date().toJSON(), this.fromid, sendmsg.toId, false, this.messages, 1, '');
        this.usersmessage.push(msg);
        this.broadcastChat(msg.fromId, sendmsg.toId, msg.message);
        this.messages = '';
        document.getElementById("scrollbottom")?.scrollIntoView();
      }, error => console.log("Error", error));
    }
  }
  deleteMessageByUser(id: string) {
    this.service_message.deleteMessage(id).subscribe(data => {
      console.log("Success", data)
      this.deleteMsg(id);
      document.getElementById("scrollbottom")?.scrollIntoView();
    }, error => console.log("Error", error));
  }

  setactive(data: any, id: string) {
    if (id) {
      data.forEach((value: any) => {
        if (value.id === id) {
          value.isActive = true;
          this.toid = value.id;
          this.loadMessageByUser(value.id);
        }
        else {
          value.isActive = false;
        }
      });
    }
    else {
      let i = 0;
      data.forEach((value: any) => {
        if (i === 0) {
          value.isActive = true;
          this.toid = value.id;
          this.loadMessageByUser(value.id);
        }
        else {
          value.isActive = false;
        }
        i++;
      });
    }
  }
  deleteMsg(id: string) {
    this.usersmessage = this.usersmessage.filter(item => item.id !== id);
  }



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
      console.log(fromid, toid, message);
      console.log(this.fromid, this.toid);
      if (this.fromid === toid && this.toid === fromid) {
        let msg = new MessageVM(new Date().toJSON(), fromid, '', true, message, 1, toid);
        this.usersmessage.push(msg);
      }
    })
  }
}
