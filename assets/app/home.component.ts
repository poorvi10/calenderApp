import { Component, OnInit } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {LoginService} from './login.service';
import {Login} from './login.model';
import { Router} from '@angular/router';

@Component({
  selector: 'my-home',
  template: `<div *ngIf="token">
              <imrc="{{imageURL}}">
              <br>
              <b>TOKEN: </b>
              <p>{{token}}</p>
              <b>NAME: </b>
              <p>{{name}}</p>
              <b>EMAIL: </b>
              <p>{{email}}</p>

              <button class="btn btn-danger" (click)="logout()">Logout</button>
            </div> `
})
export class HomeComponent implements OnInit  {
  imageURL: string;
  email: string;
  name: string;
  token: string;

  constructor(private router: Router, private auth: AuthService, private loginService: LoginService) { }  

  ngOnInit() {
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