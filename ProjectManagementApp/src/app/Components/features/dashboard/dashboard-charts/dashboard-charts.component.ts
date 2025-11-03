// dashboard-charts.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { DashboardService } from '../../../../Services/core/services/dashboard.service';
export interface TaskChartData {
  status: string;
  count: number;
}
@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})

export class DashboardChartsComponent implements OnInit {
  @Input() projectId!: number;

  chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#28a745', '#ffc107', '#dc3545'] }]
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  isLoading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.isLoading = true;
    console.log('Loading chart data for projectId:', this.projectId);
    if (!this.projectId) {
      this.errorMessage = 'Invalid project ID or No Projects Yet  ';
      this.isLoading = false;
      return;
    }
    this.dashboardService.getTaskChartData(this.projectId).subscribe({
      next: (res: TaskChartData[]) => {
        this.chartData.labels = res.map(r => r.status);
        this.chartData.datasets[0].data = res.map(r => r.count);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load chart';
        this.isLoading = false;
      }
    });
  }
}
