import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-summary',
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="this.total | number: '1.0-2'" [nzTitle]="'Total (CAD)'"></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class SummaryComponent {
  @Input() total: number = 0.0;
}