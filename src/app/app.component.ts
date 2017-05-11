import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  private response = '';
  private values = '';
  private response1 = '';

  constructor(private http: Http) { }

  onKey(event: any) {
    this.values = event.target.value;
  }

  onButtonClicked(event) {
    this.sendItemName(this.values).subscribe(res => {
      this.response = 'Response: ' + res;
      this.values = '';
    }
    );
  }

  onButtonClicked1(event) {
    this.sendItemName1('xx').subscribe(res => {
      this.response1 = 'Response: ' + res;
      this.values = '';
    }
    );
  }

  sendItemName1(itemName): Observable<String> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/x', { itemName }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  sendItemName(itemName): Observable<String> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:8080/find', { itemName }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('Response: ', body.response);

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
