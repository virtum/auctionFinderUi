import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LoginService {
    private returnUrl: string;

    constructor(private fb: FacebookService, private http: Http, private router: Router, private localStorageService: LocalStorageService, ) {
        fb.init({
            appId: '1722165054742491',
            xfbml: true,
            version: 'v2.8'
        });
    }

    login() {
        this.fb.login()
            .then((res: LoginResponse) => {
                console.log(res.authResponse.accessToken);
                this.sendAccessToken(res.authResponse.accessToken).subscribe(res => {
                    this.localStorageService.set('isLogged', true);
                    this.router.navigateByUrl('/account');
                }
                );
            })
            .catch(this.handleError);
    }

    sendAccessToken(accessToken): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:8080/authenticate', { accessToken }, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.response || {};
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