import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  private isLogged: Observable<boolean>;

  constructor(private login: LoginComponent, private localStorageService: LocalStorageService) {

    this.isLogged = this.login.isLogged;

    this.login.isLogged.subscribe(val => {
      console.log('app remote val: ', val);
    })

    this.isLogged.subscribe(val => {
      console.log('app local val: ', val);
    })

    this.login.isLogged.next(<boolean>this.localStorageService.get('isLogged'));

  }
}
