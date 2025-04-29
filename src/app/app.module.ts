import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponent } from './web/web/web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './web/components/loading/loading.component';
import { FormsModule } from '@angular/forms';
import { ValidateTicketComponent } from './web/components/validate-ticket/validate-ticket.component';
import { TicketComponent } from './web/components/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    LoadingComponent,
    ValidateTicketComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
