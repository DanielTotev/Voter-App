import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.css']
})
export class ProfileStatisticsComponent implements OnInit {
  pollCount: number;
  pollVotes:number;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getStats()
      .subscribe(data => {
        console.log(data);
        this.pollCount = data['pollsCount'];
        this.pollVotes = data['totalVotes'];
      })
  }

}
