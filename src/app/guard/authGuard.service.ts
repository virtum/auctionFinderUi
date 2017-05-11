import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';


@Injectable()
export class AuthGuard implements CanActivate {
    public isLogged: boolean = false;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn();
    }

    checkLoggedIn(): boolean {
        if (this.isLogged) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}