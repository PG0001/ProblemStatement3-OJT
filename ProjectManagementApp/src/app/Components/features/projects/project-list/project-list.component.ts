// project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../Services/core/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  isLoading = true;
  errorMessage = '';
  search: string = '';

  showDeleteDialog: boolean = false;
  selectedProjectId!: number;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: res => {
        this.projects = res;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to load projects';
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    this.loadProjects(); // Add backend search logic if needed
  }

  viewProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  onDeleteClick(projectId: number) {
    this.selectedProjectId = projectId;
    this.showDeleteDialog = true;
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        this.showDeleteDialog = false;
        this.loadProjects(); // reload after delete
      },
      error: err => console.error(err)
    });
  }
}
