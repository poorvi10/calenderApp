import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService, AppGlobals } from 'angular2-google-login';
import {LoginService} from './login.service';
import {Login} from './login.model';
import { Router} from '@angular/router';


@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  providers: [AuthService, LoginService]
})
export class AppComponent {}
  