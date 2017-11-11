import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {LoginService} from './login.service';
import {Login} from './login.model';
import { Router} from '@angular/router';


@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  providers: [AuthService, LoginService]
})
export class LoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;
  user: Login;

  constructor(private router: Router, private auth: AuthService, private zone: NgZone, private loginService: LoginService) { }

  /**
   * Ininitalizing Google Authentication API and getting data from localstorage if logged in
   */
  ngOnInit() {
    //Set your Google Client ID here
    AppGlobals.GOOGLE_CLIENT_ID = '970384031820-f0aass0u04du9s47c7u595r1ihma8kea.apps.googleusercontent.com';
    this.getData();
    setTimeout(() => { this.googleAuthenticate() }, 50);
  }

  /*01

   * Calling Google Authentication service
   */
  googleAuthenticate() {
    this.auth.authenticateUser((result) => {
      //Using Angular2 Zone dependency to manage the scope of variables
      this.zone.run(() => {
        const user = new Login(localStorage.getItem('name'),localStorage.getItem('email'), localStorage.getItem('token'),localStorage.getItem('image'));
        this.loginService.addUser(user)
            .subscribe(
              data => {
                this.getData();
                this.router.navigate(['/home']);
              },
              error => console.log(error)
            );
      });
    });
  }

  /**
   * Getting data from browser's local storage
   */
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    let scopeReference = this;
    this.auth.userLogout(function () {
      scopeReference.clearLocalStorage();
    });
  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  }
}