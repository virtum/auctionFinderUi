import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { AppComponent } from '../app.component';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    templateUrl: './account.component.html'
})

@Injectable()
export class AccountComponent {
    private subscriptionCounter: any;
    private subscriptions: any = [];
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;

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

    chooseSubscription() {
        console.log("to be done")
    }

    temp() {
        console.log("test")
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