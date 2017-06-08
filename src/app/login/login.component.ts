import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';


@Component({
    templateUrl: './login.component.html',
})

@Injectable()
export class LoginComponent {

    constructor(private loginService: LoginService, private app: AppComponent) {
        this.loginService.login(this.app.isLogged);
    }

}