import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollAllComponent } from './poll/poll-all/poll-all.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PollVoteComponent } from './poll/poll-vote/poll-vote.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: "", component: PollAllComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "poll/vote/:id", component: PollVoteComponent, canActivate: [ AuthGuard ] }
]


@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [RouterModule]
})
export class AppRouting { }