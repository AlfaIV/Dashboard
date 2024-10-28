import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
  private days = 10;
  private startDate = new Date();
  public lineChartLabels = this.getDatesArray(this.startDate, this.days);
  
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  public lineChartData:number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(
        `https://api.binance.com/api/v3/klines?symbol=BTSUSDT&interval=1d&limit=${this.days}`
      )
      .subscribe({
        next: (data: any) => {
          this.lineChartData = data.map((d: any) => d[5]);
        },
        error: (err: any) => {
          console.error('Failed to fetch data', err);
        },
      });
  }

  private getDatesArray(startDate: Date, days: number): string[] {
    const dates: string[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - i);
      dates.push(date.toLocaleDateString('ru-RU', {year: 'numeric', month: '2-digit', day: '2-digit'}));
    }
    return dates;
  }
}
