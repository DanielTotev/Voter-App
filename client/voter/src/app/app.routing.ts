import  { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { PollRoutingModule } from './poll/poll.routing';
import { ProfileStatisticsComponent } from './profile-statistics/profile-statistics.component';

const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "poll", loadChildren: () => PollRoutingModule, canActivate: [ AuthGuard ] },
    { path: "category/create", component: CategoryCreateComponent, canActivate: [ AdminGuard ]},
    { path: "admin", component: AdminPanelComponent, canActivate: [ AdminGuard ]},
    { path: 'profile', component: ProfileStatisticsComponent, canActivate: [ AuthGuard ] }
]


@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],

    exports: [RouterModule]
})
export class AppRouting { }