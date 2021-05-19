import { Component, OnInit } from '@angular/core';
import { DoseType } from './components/vaccination-completion/vaccination-completion.component';
import { EstimationService } from './services/estimation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vaccination';
  combined = DoseType.Combined;
  dose1 = DoseType.Dose1;
  dose2 = DoseType.Dose2;
  asOfDate = new Date(2021, 4, 15);
  allDoseTypeInfo: any;
  allDatesDosesTypeInfo: any;
  dates: Date[] = [];
  readonly asOfDate_range = [new Date(2021, 2, 10), new Date()];

  constructor(private estimation: EstimationService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.dates = this.getDateRange();
    this.allDatesDosesTypeInfo = await this.fetchChartingInfo(this.dates);
    this.allDoseTypeInfo = this.allDatesDosesTypeInfo[this.dates.length - 1];
    console.log(this.allDatesDosesTypeInfo);
  }

  private async fetchChartingInfo(dates: Date[]) {
    const batchSize = 4;
    const batches: any[][] = dates
      .reduce(
        (arr, date) => [
          ...arr,
          dates.slice(arr.length * batchSize, (arr.length * batchSize) + batchSize)
        ],
        Array<any>()
      ).filter(arr => arr.length > 0);

    const allInfo = [];
    for (const batch of batches) {
      allInfo.push(
        ...await Promise.all(
          batch.map(date => this.estimation.getAllParameters(date))
        )
      );
    }
    return allInfo;
  }

  private getDateRange() {
    const interval = 7;
    const dates = [new Date(this.asOfDate_range[0])];
    let lastIndex = dates.length - 1;
    while (dates[lastIndex] <= this.asOfDate_range[1]) {
      const nextDate = new Date(dates[lastIndex]);
      nextDate.setDate(nextDate.getDate() + interval);
      dates.push(nextDate);

      lastIndex++;
    }
    dates[lastIndex] = this.asOfDate_range[1];

    return dates;
  }
}
