import { Component, OnInit } from '@angular/core';
import { PollModel } from '../models/poll.model';
import { PollService } from '../poll.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-poll-all',
  templateUrl: './poll-all.component.html',
  styleUrls: ['./poll-all.component.css']
})
export class PollAllComponent implements OnInit {
  polls: PollModel[]

  constructor(private pollService: PollService, private authService: AuthService) { }

  ngOnInit() {
    this.pollService.getAll()
      .subscribe(data => {
        this.polls = data;
        console.log(this.polls);
      });
  }

}
