import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollAllComponent } from './poll/poll-all/poll-all.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
    { path: "", component: PollAllComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent }
]


@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [RouterModule]
})
export class AppRouting { }