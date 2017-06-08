import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AppComponent } from '../app.component';


@Component({
    templateUrl: './login.component.html',
})

@Injectable()
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private app: AppComponent) {
    }

    ngOnInit() {
        this.app.isLogged.next(true);
        this.loginService.login();
    }

}