import { Component, OnInit } from '@angular/core';
import { Http, HttpModule, Response, RequestOptionsArgs } from '@angular/http';
import { AuthService, AppGlobals } from 'angular2-google-login';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { Router} from '@angular/router';
import 'rxjs/Rx';


export interface CalendarRequestOptionsArgs extends RequestOptionsArgs {
  showDeleted?: boolean;
}

@Component({
  selector: 'my-home',
  template: `<div *ngIf="token">
              <img src="{{imageURL}}">
              <br>
              <b>TOKEN: </b>
              <p>{{token}}</p>
              <b>NAME: </b>
              <p>{{name}}</p>
              <b>EMAIL: </b>
              <p>{{email}}</p>
              <hr>
              <table class="table">
                 <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Event</th>
                  </tr>
                  <tr *ngFor="let event of eventList; let i = index">
                      <td>{{i + 1}}</td>
                      <td>{{event.created}}</td>
                      <td>{{event.summary}}</td>
                  </tr>
              </table>
              <button class="btn btn-danger" (click)="logout()">Logout</button>
            </div> `
})

export class HomeComponent implements OnInit  {
  dataSource: any;
  currentDate: Date = new Date(2017, 4, 25);
  imageURL: string;
  email: string;
  name: string;
  token: string;
  eventList = [];

  constructor(private http: Http, private router: Router, private auth: AuthService, private loginService: LoginService) { }  

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    var events = this.getData({ showDeleted: false });
  }
        

  private getData(requestOptions: CalendarRequestOptionsArgs) {
    let PUBLIC_KEY = 'AIzaSyBnNAISIUKe6xdhq1_rjor2rxoI3UlMY7k',
        CALENDAR_ID = 'f7jnetm22dsjc3npc2lu3buvu4@group.calendar.google.com';
    let dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
            CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

    this.http.get(dataUrl, requestOptions).toPromise().then(this.extractData);
  }
  private extractData(res: Response) {
      console.log(res.json().items[0].created);
      this.eventList = res.json().items;
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
