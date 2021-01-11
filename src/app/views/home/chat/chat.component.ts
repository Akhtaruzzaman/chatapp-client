import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/jwtAuth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user;
  constructor(private service_auth: AuthService) {
    this.user = service_auth.getUserName;
  }

  ngOnInit(): void {
  }

}
