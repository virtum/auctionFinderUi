import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  public isLogged: Subject<boolean> = new Subject<boolean>();

  constructor(private localStorageService: LocalStorageService) {
    this.isLogged.subscribe(val => {
      console.log('app local val: ', val);
    })

    this.isLogged.next(<boolean>this.localStorageService.get('isLogged'));

  }
}
