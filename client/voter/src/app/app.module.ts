import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { PollAllComponent } from './poll/poll-all/poll-all.component';
import { AuthModule } from './auth/auth.module';
import { AppRouting } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessagingInterceptor } from './interceptors/messaging.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { FormsModule } from '@angular/forms';
import { PollVoteComponent } from './poll/poll-vote/poll-vote.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CreatePollComponent } from './poll/create-poll/create-poll.component';
import { PollEditComponent } from './poll/poll-edit/poll-edit.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PollAllComponent,
    PollVoteComponent,
    CreatePollComponent,
    PollEditComponent,
    CategoryCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRouting,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MessagingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
