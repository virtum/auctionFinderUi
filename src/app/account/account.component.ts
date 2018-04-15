import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppComponent } from '../app.component';


@Component({
    templateUrl: './account.component.html'
})

@Injectable()
export class AccountComponent {
    private subscriptionCounter: any;
    private subscriptions: any = [];

    constructor(private http: Http, private localStorage: LocalStorageService, private router: Router, private app: AppComponent) { }

    ngOnInit() {
        this.getUserSubscriptions()
            .subscribe(res => {
                this.subscriptionCounter = res.subscriptionCounter;
                this.subscriptions = res.userSubscriptions;
            });
    }

    getUserSubscriptions() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.get('http://localhost:8080/rest/subscriptions', options)
            .map(res => {
                let body = res.json();
                return body || {};
            })
            .catch(err => {
                this.app.isLogged.next(false);
                this.router.navigateByUrl('/login');
                return Observable.throw('');
            });
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
        this.router.navigateByUrl('/login');
        return Observable.throw(errMsg);
    }

}