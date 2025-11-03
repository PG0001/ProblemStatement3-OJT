import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/core/services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  project: any;
  summary: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProjectDetails();
    this.loadSummary();
  }

  loadProjectDetails() {
    this.projectService.getProject(this.projectId).subscribe({
      next: (data) => (this.project = data),
      error: (err) => console.error('Error loading project details:', err)
    });
  }

  loadSummary() {
    this.projectService.getProjectSummary(this.projectId).subscribe({
      next: (data) => (this.summary = data),
      error: (err) => console.error('Error loading summary:', err)
    });
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
