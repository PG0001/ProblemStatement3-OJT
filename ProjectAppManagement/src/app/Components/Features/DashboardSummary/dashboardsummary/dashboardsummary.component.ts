import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../../Services/Dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboardsummary.component.html',
  styleUrls: ['./dashboardsummary.component.css']
})
export class DashboardSummaryComponent implements OnInit {
  projectId!: number;
  summary: any;
  isLoading = true;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    if (this.projectId) {
      this.loadSummary();
    } else {
      this.errorMessage = 'Invalid project ID.';
      this.isLoading = false;
    }
  }

  loadSummary() {
    this.dashboardService.getProjectSummary(this.projectId).subscribe({
      next: (data) => {
        console.log('Project summary loaded:', data);
        this.summary = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching project summary:', err);
        this.errorMessage = 'Unable to load summary.';
        this.isLoading = false;
      }
    });
  }
}
