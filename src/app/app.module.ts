import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VaccinationCompletionComponent } from './components/vaccination-completion/vaccination-completion.component';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatterPipe } from './pipes/date-formatter.pipe';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { ChartingComponent } from './components/charting/charting.component';
import { ChartModule } from 'angular-highcharts'

@NgModule({
  declarations: [
    AppComponent,
    VaccinationCompletionComponent,
    DateFormatterPipe,
    NumberFormatterPipe,
    ChartingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
