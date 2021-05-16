import { Injectable } from '@angular/core';
import { VaccinationService } from './vaccination.service';
import { DoseType, DoseStart } from '../components/vaccination-completion/vaccination-completion.component';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {
  readonly indiaPopulation = 1391990620

  constructor(private vaccineService: VaccinationService) { }

  async getAllParameters(asOfDate: Date) {
    const totalDoseCounts = await this.fetchTotalDoses(asOfDate);
    const response: any = {};
    for (const doseType of [DoseType.Combined, DoseType.Dose1, DoseType.Dose2]) {
      const doseStartDate = DoseStart[doseType];
      const totalDoses = totalDoseCounts[doseType];
      const totalDays = this.getTotalDaysSinceDoseStart(doseStartDate, asOfDate);
      const dosesPerDay = this.getDosesPerDay(totalDoses, doseStartDate, asOfDate);
      const indiaPopulation = this.indiaPopulation;
      const dosesRequired = doseType === DoseType.Combined ? this.getCombinedDosesRequired() : this.getDosesRequired();
      const pendingDoses = doseType === DoseType.Combined ? this.getCombinedPendingDoses(totalDoses) : this.getPendingDoses(totalDoses);
      const doseCompletionDate = this.getDoseCompletionDate(pendingDoses, dosesPerDay, asOfDate);
      response[doseType] = {
        doseStartDate,
        totalDoses,
        totalDays,
        dosesPerDay,
        indiaPopulation,
        dosesRequired,
        pendingDoses,
        doseCompletionDate,
      }
    }

    return response;
  }

  private fetchTotalDoses(asOfDate: Date) {
    return new Promise<any>(resolve => {
      this.vaccineService.getTotalVaccinationCounts(asOfDate).subscribe(obj => {
        resolve(obj);
      });
    });
  }

  getTotalDaysSinceDoseStart(doseStartDate: Date, asOfDate: Date) {
    const totalDays = Math.round((asOfDate.getTime() - doseStartDate.getTime()) / (1000 * 60 * 60 * 24));

    return totalDays;
  }

  getDosesPerDay(totalDosesCount: number, doseStartDate: Date, asOfDate: Date) {
    return totalDosesCount / this.getTotalDaysSinceDoseStart(doseStartDate, asOfDate);
  }

  getCombinedDosesRequired() {
    return 2 * this.indiaPopulation;
  }

  getDosesRequired() {
    return this.indiaPopulation;
  }

  getCombinedPendingDoses(combinedDosesCount: number) {
    return this.getCombinedDosesRequired() - combinedDosesCount;
  }

  getPendingDoses(dosesCount: number) {
    return this.getDosesRequired() - dosesCount;
  }

  getDoseCompletionDate(pendingDoses: number, dosesPerDay: number, asOfDate: Date) {
    const completionDays = pendingDoses / dosesPerDay;
    const completionDate = new Date(asOfDate);
    completionDate.setDate(completionDate.getDate() + Math.round(completionDays));

    return completionDate;
  }
}
