// project-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../Services/core/services/project.service';
import { Project } from '../../../../Models/Project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  project?: Project;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.loadProject();
    } else {
      this.errorMessage = 'Invalid project ID';
    }
  }

  loadProject() {
    this.isLoading = true;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res) => {
        this.project = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to load project';
        this.isLoading = false;
      }
    });
  }
}
