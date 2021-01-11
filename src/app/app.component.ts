import { Component } from '@angular/core';
import { AuthGuard } from './jwtAuth/auth.guard';
import { AuthService } from './jwtAuth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = localStorage.getItem("User");
  loggedin = false;
  constructor(private authservice: AuthService) {
    this.loggedin = this.authservice.isLoggedIn;
  }
  logout() {
    this.authservice.SignOut();
  }
}
