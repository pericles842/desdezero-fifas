import { Component } from '@angular/core';
import { Statistics } from 'src/app/interfaces/Statistics';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  statistics: Statistics[] = [];
  loading: boolean = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.userService.getConfigAdmin().subscribe({
      next: (value) => {
        this.statistics = value
        this.loading = false
      },
      error: (err) => {
        this.loading = false
        console.log(err)
      }
    })
  }

}
