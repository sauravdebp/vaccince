import { Component, OnInit, Input } from '@angular/core';
import { EstimationService } from 'src/app/services/estimation.service';

@Component({
  selector: 'app-vaccination-completion',
  templateUrl: './vaccination-completion.component.html',
  styleUrls: ['./vaccination-completion.component.css']
})
export class VaccinationCompletionComponent implements OnInit {
  @Input() allInfo: any = null;
  @Input() doseType: DoseType = DoseType.Combined;
  @Input() asOfDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }
}

export enum DoseType {
  Dose1 = 'Dose 1',
  Dose2 = 'Dose 2',
  Combined = 'Dose 1 + Dose 2',
}

export const DoseStart = {
  'Dose 1': new Date(2021, 0, 16),
  'Dose 2': new Date(2021, 1, 13),
  'Dose 1 + Dose 2': new Date(2021, 0, 16),
}