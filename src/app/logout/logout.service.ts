import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

@Injectable()
export class LogoutService {

    constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService, private fb: FacebookService) { }

    logout() {
        this.logoutUser().subscribe(res => {
            this.localStorageService.set('isLogged', false);
            this.fb.logout();
            this.router.navigate(['/home']);
        }
        );
    }

    private logoutUser() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.get('http://localhost:8080/rest/logout', options)
            .map(res => {
                let body = res.json();
                return body || {};
            })
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}