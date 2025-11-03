// dashboard-summary.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ProjectSummary } from '../../../../Models/ProjectSummary';
import { DashboardService } from '../../../../Services/core/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.css']
})
export class DashboardSummaryComponent implements OnInit {
  @Input() projectId: number = 0;

  summary?: ProjectSummary;
  isLoading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.loadSummary();
  }
  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }
  loadSummary() {
    this.isLoading = true;
    if (!this.projectId) {
      this.errorMessage = 'Invalid project ID or No Projects Yet';
      this.isLoading = false;
      return;
    }
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
