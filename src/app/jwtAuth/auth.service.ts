import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {


  }
  get isLoggedIn(): boolean {
    var token = localStorage.getItem('Token');
    return (token !== null) ? true : false;
  }
  get getUserName() {
    var user = localStorage.getItem('User')?.toString();
    return user;
  }
  // Sign out 
  SignOut() {
    localStorage.removeItem('Token');
    localStorage.removeItem('User');
    this.router.navigate(['login']);
  }
}
