import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { DoseType } from '../components/vaccination-completion/vaccination-completion.component';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  constructor(private http: HttpClient) { }

  get(asofDate: Date) {
    const url = `https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports`;
    return this.http.get(url, {
      params: {
        date: `${asofDate.getFullYear()}-${asofDate.getMonth() + 1}-${asofDate.getDate()}`
      }
    });
  }

  getTotalVaccinationCounts(asofDate: Date) {
    return this.get(asofDate).pipe(map((response: any) => {
      const resp: any = {};
      resp[DoseType.Combined] = 0;
      resp[DoseType.Dose1] = 0;
      resp[DoseType.Dose2] = 0;
      if (response['topBlock'] && response['topBlock']['vaccination']) {
        const obj = response['topBlock']['vaccination'];
        resp[DoseType.Combined] = obj['total_doses'];
        resp[DoseType.Dose1] = obj['tot_dose_1'];
        resp[DoseType.Dose2] = obj['tot_dose_2'];
      }
      return resp;
    }));
  }
}
