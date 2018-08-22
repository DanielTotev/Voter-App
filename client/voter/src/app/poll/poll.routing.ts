import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PollAllComponent } from './poll-all/poll-all.component';
import { PollVoteComponent } from './poll-vote/poll-vote.component';
import { PollEditComponent } from './poll-edit/poll-edit.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { AdminGuard } from '../guards/admin.guard';
import { PollDeleteComponent } from './poll-delete/poll-delete.component';

const routes: Routes = [
    { path:"all", component: PollAllComponent },
    { path: "vote/:id", component: PollVoteComponent },
    { path: "edit/:id", component: PollEditComponent, canActivate: [ AdminGuard ] },
    { path: "create", component: CreatePollComponent },
    { path: "delete/:id", component: PollDeleteComponent }
]

@NgModule({
    declarations: [
        PollAllComponent,
        PollVoteComponent,
        PollEditComponent,
        CreatePollComponent,
        PollDeleteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class PollRoutingModule { }