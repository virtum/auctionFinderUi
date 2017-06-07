import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthGuard } from '../guard/authGuard.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppComponent } from "../app.component";

@Component({
    templateUrl: './account.component.html'
})

@Injectable()
export class AccountComponent implements OnInit {
    private accountData: String;
    private subscriptions: any = [];

    constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService, private app: AppComponent) { }

    ngOnInit() {
        this.getUserSubscriptions().subscribe(res => {
            this.accountData = res.accountData;
            this.subscriptions = res.auctions;
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
            .catch(this.handleError);
    }

    logout() {
        this.logoutUser().subscribe(res => {
            this.localStorageService.set('isLogged', false);
            this.app.isLogged.next(false);
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