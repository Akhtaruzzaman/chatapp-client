import { Component, OnInit } from '@angular/core';
import { LoginVM } from 'src/app/model/LoginVM';
import { UserLoginService } from 'src/app/service/user-login.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_model = new LoginVM('', '');
  constructor(private user_login_service: UserLoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("Token", "");
    localStorage.setItem("User", "");
  }
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user_login_service.enroll(this.login_model).subscribe(data => {
      console.log("Success", data)
      localStorage.setItem("Token", "Bearer " + data.token);
      localStorage.setItem("User", data.userName);
      this.router.navigateByUrl('/chat');
    }, error => {
      console.log("Error", error)
    });
  }
}
