import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollAllComponent } from './poll/poll-all/poll-all.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PollVoteComponent } from './poll/poll-vote/poll-vote.component';
import { AuthGuard } from './guards/auth.guard';
import { CreatePollComponent } from './poll/create-poll/create-poll.component';
import { PollEditComponent } from './poll/poll-edit/poll-edit.component';
import { AdminGuard } from './guards/admin.guard';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { PollRoutingModule } from './poll/poll.routing';

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "poll", loadChildren: () => PollRoutingModule, canActivate: [ AuthGuard ] },
    { path: "category/create", component: CategoryCreateComponent, canActivate: [ AdminGuard ]},
    { path: "admin", component: AdminPanelComponent, canActivate: [ AdminGuard ]}
]


@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [RouterModule]
})
export class AppRouting { }