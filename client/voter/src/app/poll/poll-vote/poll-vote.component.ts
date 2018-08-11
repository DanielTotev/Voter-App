import { Component, OnInit } from '@angular/core';
import { PollModel } from '../models/poll.model';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {
  poll: PollModel;

  constructor() { }

  ngOnInit() {
  }

}
