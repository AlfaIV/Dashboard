import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  public pieChartData = [65,12,1];
  public pieChartLabels: string[] = ['Red', 'Blue', 'Yellow'];
  public pieChartOptions = {
    responsive: true,
  };
  public pieChartLegend = true;
}
