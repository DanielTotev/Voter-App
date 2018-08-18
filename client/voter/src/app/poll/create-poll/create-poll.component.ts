import { Component, OnInit } from '@angular/core';
import { CreatePollModel } from '../models/create-poll.model';
import { PollService } from '../poll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  userInputData: CreatePollModel;
  categories: string[];

  constructor(private pollService: PollService, private router: Router) {
    this.userInputData = new CreatePollModel('', '', '');
  }

  ngOnInit(): void {
    this.pollService.getCategories()
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
        this.userInputData.category = this.categories[0];
      });
  }

  create() {
    this.pollService.createPoll(this.userInputData)
      .subscribe(data => {
        this.router.navigate(['/poll/all']);
      });
  }
}
