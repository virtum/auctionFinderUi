import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthGuard } from '../guard/authGuard.service';

@Component({
    templateUrl: './finder.component.html'
})

@Injectable()
export class FinderComponent {
    private response = '';
    private values = '';

    constructor(private http: Http, private guard: AuthGuard, private router: Router) { }

    onKey(event: any) {
        this.values = event.target.value;
    }

    onButtonClicked(event) {
        this.sendItemName(this.values).subscribe(res => {
            console.log(this.values);
            this.response = 'Response: ' + res;
            this.values = '';
        }
        );
    }

    sendItemName(item): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:8080/rest/find', { item }, options)
            .map(res => {
                let body = res.json();
                return body.response || {};
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

    logout() {
        this.logoutUser().subscribe(res => {
            this.guard.isLogged = false;
            this.router.navigate(['/login']);
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

}