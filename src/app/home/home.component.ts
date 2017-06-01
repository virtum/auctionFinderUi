import { Component, ViewChild, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FindRequestModel } from '../home/findRequestModel';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent {
    private response: String = '';
    private item: String = '';
    private email: String = '';
    private requestModel: FindRequestModel;
    private isResponseBack: boolean = false;

    @ViewChild('autoShownRequestModal') public autoShownRequestModal: ModalDirective;

    public isRequestModalShown: boolean = false;

    public constructor(private http: Http, ) {
    }

    public showRequestModal(): void {
        this.isRequestModalShown = true;
    }

    public hideRequestModal(): void {
        this.autoShownRequestModal.hide();
    }

    public onRequestHidden(): void {
        this.isRequestModalShown = false;
    }

    onItemKey(event: any) {
        this.item = event.target.value;
    }

    onEmailKey(event: any) {
        this.email = event.target.value;
    }

    onButtonClicked(event) {
        this.requestModel = {
            item: this.item,
            email: this.email
        };

        this.sendItemName(this.requestModel).subscribe(res => {
            console.log(this.item);
            this.response = res;

            this.isResponseBack = true;
        }
        );
        
        this.item = '';
        this.email = '';
        this.hideRequestModal();
    }

    sendItemName(requestData): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:8080/find', requestData, options)
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
        // TODO add message showing failure on page
        return Observable.throw(errMsg);
    }

}