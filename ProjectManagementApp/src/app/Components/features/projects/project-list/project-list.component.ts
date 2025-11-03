import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../Services/core/services/project.service';
import { Project } from '../../../../Models/Project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  searchTerm = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects(1, 10, this.searchTerm).subscribe({
      next: (res) => (this.projects = res),
      error: (err) => console.error('Error fetching projects', err)
    });
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error('Error deleting project', err)
      });
    }
  }
}
