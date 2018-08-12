import { Component, OnInit } from '@angular/core';
import { PollModel } from '../models/poll.model';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {
  poll: PollModel;

  constructor(private pollService: PollService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.pollService.getById(id)
      .subscribe(data => {
        this.poll = data;
        console.log(this.poll);
      })
  }

  vote(userInput) {
    console.log(userInput);
  }

}
