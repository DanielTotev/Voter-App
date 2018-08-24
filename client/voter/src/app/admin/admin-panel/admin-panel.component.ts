import { Component, OnInit } from '@angular/core';
import { PollModel } from '../../poll/models/poll.model';
import { PollService } from '../../poll/poll.service';
import { CategoryService } from '../../category/category.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  polls: PollModel[];
  categories: string[];

  constructor(private pollService: PollService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((data) => {
        this.categories = data;
        console.log('asd');
        console.log(this.categories);
      })
    this.pollService.getAll()
      .subscribe(data => {
        this.polls = data;
        console.log(this.polls);
      })  
  }

  deleteCategory(category: string) {
    this.categoryService.deleteCategory(category)
      .subscribe(() => {
        this.categories = this.categories.filter(x => x !== category);
        this.polls = this.polls.filter(x => x.category !== category);
      });
  }
}
