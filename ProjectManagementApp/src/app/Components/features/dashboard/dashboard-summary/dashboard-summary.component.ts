// dashboard-summary.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ProjectSummary } from '../../../../Models/ProjectSummary';
import { DashboardService } from '../../../../Services/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.css']
})
export class DashboardSummaryComponent implements OnInit {
  @Input() projectId!: number;

  summary?: ProjectSummary;
  isLoading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.isLoading = true;
    this.dashboardService.getProjectSummary(this.projectId).subscribe({
      next: (res) => {
        this.summary = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load summary';
        this.isLoading = false;
      }
    });
  }
}
