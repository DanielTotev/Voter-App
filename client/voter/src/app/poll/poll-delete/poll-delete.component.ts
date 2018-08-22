import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PollModel } from '../models/poll.model';

@Component({
  selector: 'app-poll-delete',
  templateUrl: './poll-delete.component.html',
  styleUrls: ['./poll-delete.component.css']
})
export class PollDeleteComponent implements OnInit {
  data: PollModel;

  constructor(private pollService: PollService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.pollService.getById(id)
      .subscribe(data => {
        this.data = data;
        this.data['optionsToShow'] = this.data.options.map(x => x['name']);
      })
  }

  delete() {
    this.pollService.delete(this.data._id)
      .subscribe(() => {
        this.router.navigate(['/poll/all']);
      })
  }

}
