import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/service/user-registration.service';
import { RegistrationVM } from '../../../model/RegistrationVM';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  reg_model = new RegistrationVM('', '', '', '');
  constructor(private user_reg_service: UserRegistrationService, private router: Router) { }

  ngOnInit(): void {
  }
  submitted = false;

  onSubmit() {
    if (this.reg_model.password === this.reg_model.confirm_password) {
      this.submitted = true;
      this.user_reg_service.enroll(this.reg_model).subscribe(data => {
        console.log("Success", data)
        localStorage.setItem("Token", "Bearer " + data.token);
        localStorage.setItem("User", data.userName);
        localStorage.setItem("UserId", data.id);
        this.router.navigateByUrl('/chat');
      }, error => console.log("Error", error));
    }
  }
}
