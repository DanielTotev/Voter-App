import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { PollAllComponent } from './poll/poll-all/poll-all.component';
import { AuthModule } from './auth/auth.module';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollAllComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
