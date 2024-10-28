import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  public barChartData: number[] = [];
  public barChartLabels: string[] = [];
  public barChartOptions = {
    responsive: true,
  };
  public barChartLegend = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://api.binance.com/api/v3/ticker/24hr').subscribe({
      next: (data: any) => {
        let dataSelection = data
          .sort((a: any, b: any) => b.volume - a.volume)
          .slice(0, 10);
        this.barChartData = dataSelection.map((d: any) => d.volume);
        this.barChartLabels = dataSelection.map((d: any) => d.symbol);
      },
      error: (err: any) => {
        console.error('Failed to fetch data', err);
      },
    });
  }
}
