import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { stepRequest } from '../../utils/step.request';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, ButtonComponent],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent {
  public days: number = 30;
  public interval: string = "дней";
  private startDate = new Date();
  public lineChartLabels: string[] = [];

  public lineChartOptions = {
    responsive: true,
  };
  public lineChartLegend = false;
  public lineChartType = 'line';

  public lineChartData: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.updateChart(stepRequest.days);
  }

  private updateData(interval: stepRequest, limit: number): any {
    this.http
      .get(
        `https://api.binance.com/api/v3/klines?symbol=BTSUSDT&interval=${interval}&limit=${limit}`
      )
      .subscribe({
        next: (data: any) => {
          this.lineChartData = data.map((d: any) => d[5]).reverse();
        },
        error: (err: any) => {
          console.error('Failed to fetch data', err);
        },
      });
  }

  private updateChart(interval: stepRequest): void {
    this.updateData(interval, this.days);
    this.lineChartLabels = this.getDatesArray(
      this.startDate,
      this.days,
      interval
    );
  }

  private getDatesArray(
    startDate: Date,
    days: number,
    interval: string
  ): string[] {
    const dates: string[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(
        startDate.getTime() - i * this.getIntervalTime(interval)
      );
      switch (interval) {
        case '1d':
          dates.push(
            date.toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          );
          break;
        case '1h':
          dates.push(
            date.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
            })
          );
          break;
        case '1m':
          dates.push(date.toLocaleTimeString('ru-RU', { minute: '2-digit' }) + ' c');
          break;
        default:
          break;
      }
    }
    return dates.reverse();
  }

  private getIntervalTime(interval: string): number {
    switch (interval) {
      case '1d':
        return 1000 * 60 * 60 * 24;
      case '1h':
        return 1000 * 60 * 60;
      case '1m':
        return 1000 * 60;
      default:
        return 0;
    }
  }

  public handleButtonClick(btnName: string): void {
    switch (btnName) {
      case 'minutes':
        this.updateChart(stepRequest.minutes);
        this.interval = "минут";
        break;
      case 'hours':
        this.updateChart(stepRequest.hours);
        this.interval = "часов";
        break;
      case 'days':
        this.updateChart(stepRequest.days);
        this.interval = "дней";
        break;
      default:
        break;
    }
  }
}
