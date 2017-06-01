import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: './home.component.html'
})

@Injectable()
export class HomeComponent {
    private response = '';
    private values = '';

    constructor(private http: Http) { }

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

    sendItemName(itemName): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:8080/rest/find', { itemName }, options)
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

}