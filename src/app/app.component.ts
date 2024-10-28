import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BaseChartDirective } from 'ng2-charts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

import { LineChartComponent } from "./line-chart/line-chart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective, HttpClientModule, LineChartComponent, PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'RosAtom';
  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  // public lineChartData2: ChartConfiguration<'line'>['data'] = {
  //   labels: [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July'
  //   ],
  //   datasets: [
  //     {
  //       data: [ 65, 59, 80, 81, 56, 55, 40 ],
  //       label: 'Series A',
  //       fill: true,
  //       tension: 0.5,
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(255,0,0,0.3)'
  //     }
  //   ]
  // };
}
