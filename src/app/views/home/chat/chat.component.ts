import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/jwtAuth/auth.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user;
  messageuser =[];
  constructor(private service_auth: AuthService, private service_message: MessageService) {
    this.user = service_auth.getUserName;
  }

  ngOnInit(): void {
    this.service_message.getUser().subscribe(data => {
      console.log("Success", data)
    }, error => console.log("Error", error));
    console.log(this.messageuser);
  }

}
