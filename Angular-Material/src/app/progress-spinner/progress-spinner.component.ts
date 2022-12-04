import { Component, OnInit } from '@angular/core';
import { interval, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  public loadingPercent = 0

  constructor() { }

  ngOnInit(): void {
    this.loadingProgress(500).
    subscribe(i => this.loadingPercent = i)
  }


  loadingProgress(speed: number){
    return interval(speed).pipe(
      map(i => i * 10),
      takeWhile(i => i <= 95)
    )

  }
}
