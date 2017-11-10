export class Login {
    name: string;
    email: string;
    token: string;
    image?: string;

    constructor(name: string, email: string,token: string,image?: string) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.image = image;
    }
}