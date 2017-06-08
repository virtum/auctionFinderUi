import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private localStorageService: LocalStorageService, private loginService: LoginService, private logoutService: LogoutService) {
    this.isLogged.next(<boolean>this.localStorageService.get('isLogged'));
  }

  login() {
    this.isLogged.next(true);
    this.loginService.login();
  }

  logout() {
    this.isLogged.next(false);
    this.logoutService.logout();
  }
}
