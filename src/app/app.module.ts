import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FacebookModule } from 'ngx-facebook';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/authGuard.service';
import { AccountComponent } from "./account/account.component"
import { ModalModule } from 'ngx-bootstrap/modal';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CollapsibleModule } from 'angular2-collapsible';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CollapsibleModule,
    LocalStorageModule.withConfig({ storageType: 'localStorage' }),
    FacebookModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [AuthGuard, LocalStorageService, LoginComponent, LoginService, LogoutService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
