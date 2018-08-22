import { Component, OnInit } from '@angular/core';
import { PollModel } from '../models/poll.model';
import { PollService } from '../poll.service';
import { AuthService } from '../../auth/auth.service';
import { CategoryService } from '../../category/category.service';

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
  categories: string;

  constructor(private pollService: PollService,
    private authService: AuthService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.pollService.getAll()
      .subscribe(data => {
        this.polls = data.reverse();
        this.initialPolls = data;
        console.log(this.polls);
      });

    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data.join(',');
      })
  }

  search(formData) {
    let category = formData['category'];
    this.polls = this.initialPolls.filter(x => x.category === category);
  }

  pageChanged(p) {
    this.page = p;
  }

  // deletePoll(id) {
  //   this.pollService.delete(id)
  //     .subscribe(() => {
  //       this.polls = this.polls.filter(x => x._id !== id);
  //       this.initialPolls = this.initialPolls.filter(x => x._id !== id);
  //     });
  // }
}
