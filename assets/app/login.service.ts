import {Login} from "./login.model";

export class LoginService {
    private login: Login[] = [];

    addUser(data: Login) {
        console.log(data);
    }
}