import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FacebookModule } from 'ngx-facebook';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FinderComponent } from './auctionFinder/finder.component';
import { AuthGuard } from './guard/authGuard.service';
import { AccountComponent } from "./account/account.component"
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FinderComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FacebookModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'find', component: FinderComponent, canActivate: [AuthGuard] },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
