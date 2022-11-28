import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { fromEvent, map } from 'rxjs';

export const SCROLL_CONTAINER = 'mat-sidenav-content';
export const TEXT_LIMIT = 50;
export const SHADOW_LIMIT = 100;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isSmallScreen: boolean = false;
  public showText: boolean = false;
  public applyShadow: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    const container = document.getElementsByClassName(SCROLL_CONTAINER)[0];

    fromEvent(container, 'scroll')
      .pipe(map(() => container.scrollTop))
      .subscribe({
        next: (value: number) => this.determineHeader(value), // next recebe o resultado do map
      });
  }

  determineHeader(scrollTop: number) {
    this.showText = scrollTop >= TEXT_LIMIT;
    this.applyShadow = scrollTop >= SHADOW_LIMIT;
  }
  ngAfterContentInit(): void {
    // Observando o tempo todo o tamanho da tela
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe({
      next: (res) => {
        if (res.matches) {
          this.isSmallScreen = true;
        } else {
          this.isSmallScreen = false;
        }
      },
    });
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }
}
