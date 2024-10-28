import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  public pieChartData: number[] = [];
  public pieChartLabels: string[] = [];
  public pieChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://api.binance.com/api/v3/ticker/price').subscribe({
      next: (data: any) => {
        let dataSelection = data
          .filter((d: any) => d.symbol.includes('USD'))
          .slice(0, 5);

        this.pieChartData = dataSelection.map((d: any) => d.price);
        this.pieChartLabels = dataSelection.map((d: any) => d.symbol);
      },
      error: (err: any) => {
        console.error('Failed to fetch data', err);
      },
    });
  }
}
