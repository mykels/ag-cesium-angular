import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'agc-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    console.log('AppComponent [initialized]');
  }
}
