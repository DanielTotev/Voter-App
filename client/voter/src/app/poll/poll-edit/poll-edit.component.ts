import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePollModel } from '../models/create-poll.model';

@Component({
  selector: 'app-poll-edit',
  templateUrl: './poll-edit.component.html',
  styleUrls: ['./poll-edit.component.css']
})
export class PollEditComponent implements OnInit {
  id: string;
  editData: CreatePollModel;
  categories: string[];

  constructor(private pollService: PollService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];;
    this.pollService.getById(this.id)
      .subscribe(data => {
        let options = data.options.map(x => x['name']).join(',');
        this.editData = new CreatePollModel(data.title, data.category, options);
        console.log(this.editData);
        this.pollService.getCategories()
          .subscribe(categories => {
            this.categories = categories;
            console.log(this.categories);
          });
      });
  }

  edit() {
    this.pollService.edit(this.id, this.editData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

}
