import {Http, Response, Headers} from "@angular/http"
import {Login} from "./login.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/Rx";

@Injectable()
export class LoginService {

    constructor(private http: Http) {}
    addUser(data: Login) {
        const body = JSON.stringify(data);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post("http://localhost:4200/", body, {headers:headers})
            .map((response: Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()))
    }
}