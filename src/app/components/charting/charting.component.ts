import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DoseType } from '../vaccination-completion/vaccination-completion.component';

@Component({
  selector: 'app-charting',
  templateUrl: './charting.component.html',
  styleUrls: ['./charting.component.css']
})
export class ChartingComponent implements OnInit {
  @Input() dates: Date[] = [];
  private _allDatesDosesTypeInfo: any[] = [];
  @Input() set allDatesDosesTypeInfo(value: any[]) {
    this._allDatesDosesTypeInfo = value;
    if (this._allDatesDosesTypeInfo)
      this.barChartPopulation();
  }
  get allDatesDosesTypeInfo() {
    return this._allDatesDosesTypeInfo;
  }

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
  }

  barChartPopulation() {
    const series1 = this.allDatesDosesTypeInfo.map(info => info[DoseType.Combined].doseCompletionDate.getTime());
    const series2 = this.allDatesDosesTypeInfo.map(info => info[DoseType.Dose1].doseCompletionDate.getTime());
    const series3 = this.allDatesDosesTypeInfo.map(info => info[DoseType.Dose2].doseCompletionDate.getTime());
    console.log(series1);
    Highcharts.chart('barChart', {
      title: {
        text: 'Estimation for Vaccination end date.'
      },
      xAxis: {
        categories: this.dates.map(dt => dt.toDateString())
      },
      yAxis: {
        min: new Date(2021,0,1).getTime(),
        title: {
          text: 'Estimate',
          align: 'high'
        },
        labels: {
          formatter: function() {
            return new Date(this.value).toDateString();
          }
        }
      },
      plotOptions: {
        line: {
          
        }
      },
      series: [{
        type: 'line',
        name: 'Dose 1 + Dose 2',
        data: series1
      },{
        type: 'line',
        name: 'Dose 1',
        data: series2
      },{
        type: 'line',
        name: 'Dose 2',
        data: series3
      }]
    });
  }
}
