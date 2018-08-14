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
  polls: PollModel[];
  initialPolls: PollModel[];
  pageSize = 3;
  page = 1;

  constructor(private pollService: PollService, private authService: AuthService) { }

  ngOnInit() {
    this.pollService.getAll()
      .subscribe(data => {
        this.polls = data.reverse();
        this.initialPolls = data;
        console.log(this.polls);
      });
  }

  search(formData) {
    let category = formData['category'];
    this.polls = this.initialPolls.filter(x => x.category === category);
  }

  pageChanged(p) {
    this.page = p;
  }

  deletePoll(id) {
    this.pollService.delete(id)
      .subscribe(() => {
        this.polls = this.polls.filter(x => x._id !== id);
        this.initialPolls = this.initialPolls.filter(x => x._id !== id);
      });
  }
}
