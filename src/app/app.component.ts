import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { HttpService } from './http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Quotation } from './quotation';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpService],
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

  quotations: Quotation[] = [];
  public lineChart = [{ data: Array<Number>(), label: "BTS" }];
  public lineChartData1 = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        `https://api.binance.com/api/v3/klines?symbol=BTSUSDT&interval=1d&limit=10`
      )
      .subscribe({
        next: (data: any) => {
          this.quotations = data.map(
            (d: any) =>
              new Quotation(
                d[0],
                d[1],
                d[2],
                d[3],
                d[4],
                d[5],
                d[6],
                d[7],
                d[8],
                d[9],
                d[10]
              )
          );
          console.log(this.quotations);
          this.lineChart[0].data = this.quotations.map((q: any) => q.closePrice);
          console.log(this.lineChart[0].data);
        },
        error: (err: any) => {
          console.error('Failed to fetch data', err);
        },
      });
  }
}
