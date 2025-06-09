import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoadingComponent } from './web/components/loading/loading.component';
import { TicketComponent } from './web/components/ticket/ticket.component';
import { ValidateTicketComponent } from './web/components/validate-ticket/validate-ticket.component';
import { WebComponent } from './web/web/web.component';
import { UserWinComponent } from "./standalone/user-win/user-win.component";
import { CardAwardComponent } from "./standalone/card-award/card-award.component";
import { CarouselModule } from 'primeng/carousel';




@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    ValidateTicketComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    LoadingComponent,
    UserWinComponent,
    CarouselModule,
    CardAwardComponent
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
