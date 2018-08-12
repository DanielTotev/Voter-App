import { Component, OnInit } from '@angular/core';
import { PollModel } from '../models/poll.model';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from './../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-poll-vote',
  templateUrl: './poll-vote.component.html',
  styleUrls: ['./poll-vote.component.css']
})
export class PollVoteComponent implements OnInit {
  poll: PollModel;
  selectedOption: string;

  constructor(private pollService: PollService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.pollService.getById(id)
      .subscribe(data => {
        this.poll = data;
        this.selectedOption = this.poll.options[0]['name'];
        console.log(this.poll);

        let dataPoints = [];
        for(let option of this.poll.options) {
            dataPoints.push({ label: option['name'], y: option['points'] + 10})
        }

        let chart = new CanvasJS.Chart("chartContainer", {
          theme: "theme1",
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.poll.title
          },
          data: [{
            type: "column",
            dataPoints: dataPoints
          }]
        });

        chart.render();
      })
  }

  vote() {
    console.log(this.selectedOption);
  }

}
