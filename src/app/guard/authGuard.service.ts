import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthGuard implements CanActivate {
    public isLogged: boolean = false;

    constructor(private router: Router, private http: Http) {
        this.isUserLogged().subscribe(res => {
            this.isLogged = res.logged;
        }
        );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(returnUrl): boolean {
        if (this.isLogged) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
        return false;
    }

    private isUserLogged() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get('http://localhost:8080/isLogged', options)
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