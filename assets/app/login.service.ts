import {Http, Response} from "@angular/http"
import {Login} from "./login.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/Rx";

@Injectable()
export class LoginService {
    private login: Login[] = [];

    constructor(private http: Http) {}
    addUser(data: Login) {
        const body = JSON.stringify(data);
        this.http.post("http://localhost:3000/", body)
            .map((response: Response) => response.json())
            .catch((error:Response) => Observable.throw(error.json()))
    }
}