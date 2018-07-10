import { Component, ViewChild, Injectable, ViewContainerRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FindRequestModel } from '../home/findRequestModel';
import { ModalDirective } from 'ngx-bootstrap/modal';
import 'rxjs/add/observable/throw';
import { ToastrService } from 'ngx-toastr';

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

    @ViewChild('autoShownRequestModal') public autoShownRequestModal: ModalDirective;

    public isRequestModalShown: boolean = false;

    public constructor(private http: Http, public toastr: ToastrService) { }

    showSuccess() {
        this.toastr.success('Subskrypcja została stworzona!', 'Sukces!', { timeOut: 4000 });
    }

    showError() {
        this.toastr.error('Subskrypcja nie została dodana, spróbuj ponownie!', 'Oops!', { timeOut: 4000 });
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
            this.response = res;
            this.showSuccess();
        });

        this.item = '';
        this.email = '';
        this.hideRequestModal();
    }

    private sendItemName(requestData): Observable<String> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:8080/find', requestData, options)
            .map(res => {
                let body = res.json();
                return body.response || {};
            })
            .catch(err => {
                this.showError();
                return Observable.throw(err);
            });
    }

}