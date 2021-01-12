import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/jwtAuth/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { MessageVM } from 'src/app/model/MesssageVM';
import { SendMessageVM } from 'src/app/model/SendMessageVM';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagediv') messagediv: any;
  user;
  search;
  messageuser = [];
  usersmessage: Array<MessageVM> = [];
  messages;
  toid;
  constructor(private service_auth: AuthService, private service_message: MessageService) {
    this.user = service_auth.getUserName;
    this.search = '';
    this.messages = '';
    this.toid = '';
  }
  ngOnInit(): void {
    this.service_message.getUser().subscribe(data => {
      console.log("Success", data)
      this.setactive(data, '');
      this.messageuser = data;
    }, error => console.log("Error", error));
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
        let msg = new MessageVM(new Date().toJSON(), '', '', false, this.messages, 1, '');
        this.usersmessage.push(msg);
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
}
