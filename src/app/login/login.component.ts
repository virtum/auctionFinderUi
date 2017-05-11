import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { AuthGuard } from '../guard/authGuard.service';

@Component({
    templateUrl: './login.component.html',
})

@Injectable()
export class LoginComponent {

    constructor(private fb: FacebookService, private http: Http, private guard: AuthGuard) {
        console.log('login');
        fb.init({
            appId: '1722165054742491',
            xfbml: true,
            version: 'v2.8'
        });
    }

    login() {
        this.fb.login()
            .then((res: LoginResponse) => {
                console.log('Logged in', res);
                console.log('Access token: ', res.authResponse.accessToken);
                this.sendAccessToken(res.authResponse.accessToken).subscribe(res => {
                    this.guard.isLogged = <any>res;
                }
                );
            })
            .catch(this.handleError);
    }

    sendAccessToken(accessToken): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8080/login', { accessToken }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log('Response: ', body.logged);

        return body.logged || {};
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